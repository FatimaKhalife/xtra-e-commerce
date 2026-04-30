import { dbPool } from "../config/db.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { transporter } from "../config/email.js";
import { generateToken } from "../utils/generateToken.js";
import { sendAuthCookie } from "../utils/sendCookie.js";
import { OAuth2Client } from "google-auth-library";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const signup = async (req, res) => {

    const { name, email, password } = req.body;
    const token = crypto.randomBytes(32).toString("hex");
    const hashed = await bcrypt.hash(password, 10);
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    const [existing] = await dbPool.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );

    if (existing.length && existing[0].verified)
        return res.status(400).json({ success: false, message: "Email exists" });

    if (existing.length) {
        await dbPool.query(
            "UPDATE users SET name=?, password=?, verification_token=?, verification_expires=?, verified=FALSE WHERE id=?",
            [name, hashed, token, expiresAt, existing[0].id]
        );
    } else {
        await dbPool.query(
            "INSERT INTO users (name,email,password,verification_token,verification_expires) VALUES (?,?,?,?,?)",
            [name, email, hashed, token, expiresAt]
        );
    }

    // const link = `http://localhost:5000/auth/verify?token=${token}`;
    const link = `${process.env.BACKEND_URL}/auth/verify?token=${token}`;

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Verify your email",
        html: `<p>Hello ${name}, please verify:</p>
           <a href="${link}">Verify Email</a>`,
    })

    res.json({ success: true, message: "Check your email to verify." });

};

export const verifyEmail = async (req, res) => {
    const { token } = req.query;

    const [user] = await dbPool.query(
        "SELECT * FROM users WHERE verification_token = ?",
        [token]
    );

    if (!user.length) return res.status(400).send("Invalid token");

    await dbPool.query(
        "UPDATE users SET verified=TRUE, verification_token=NULL, verification_expires=NULL WHERE id=?",
        [user[0].id]
    );

    // res.redirect("http://localhost:5173/login");
    res.redirect(`${process.env.CLIENT_URL}/login`);
}


export const login = async (req, res) => {
    const { email, password, remember } = req.body;

    const [rows] = await dbPool.query(
        "SELECT * FROM users WHERE email=?",
        [email]
    );

    if (!rows.length)
        return res.status(400).json({ success: false, message: "Email not found" });

    const user = rows[0];

    if (!user.verified)
        return res
            .status(403)
            .json({ success: false, message: "Please verify your email" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
        return res.status(400).json({ success: false, message: "Incorrect password" });

    // const token = generateToken(user.id, remember);
    const token = generateToken(user, remember);
    sendAuthCookie(res, token, remember);

    res.json({ success: true, message: "Logged in" });

}
export const googleLogin = async (req, res) => {
    const { credential } = req.body;

    const ticket = await googleClient.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID,
    });

    const data = ticket.getPayload();

    const googleId = data.sub;
    const email = data.email;
    const name = data.name;
    const avatar = data.picture;

    const [existing] = await dbPool.query(
        "SELECT * FROM users WHERE google_id=? OR email=?",
        [googleId, email]
    );

    let userId;
    let user;

    if (existing.length) {

        userId = existing[0].id;
        user = existing[0];
        if (!existing[0].google_id) {
            await dbPool.query(
                "UPDATE users SET google_id=?, verified=TRUE WHERE id=?",
                [googleId, userId]
            );
        }
        await dbPool.query("UPDATE users SET avatar=? WHERE id=?", [
            avatar,
            userId,
        ]);
    } else {
        const [result] = await dbPool.query(
            "INSERT INTO users (name,email,google_id,avatar,verified) VALUES (?,?,?,?,TRUE)",
            [name, email, googleId, avatar]
        );
        userId = result.insertId;
        user = { id: userId, name, email };
    }

    // const token = generateToken(userId, true);
    const token = generateToken(user, true);
    sendAuthCookie(res, token, true);

    res.json({ success: true, message: "Google login successful" });
};

export const me = async (req, res) => {
    res.json({ success: true, userId: req.userId });
};

export const logout = (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
    });

    res.json({ success: true, message: "Logged out" });
};