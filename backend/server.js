// import dotenv from "dotenv";
// dotenv.config();

// import express from "express";
// import cors from "cors";
// import mysql from "mysql2/promise";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import cookieParser from "cookie-parser";
// import nodemailer from "nodemailer";
// import crypto from "crypto";
// import schedule from "node-schedule";
// import { OAuth2Client } from "google-auth-library";


// const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
// const app = express();

// const port = 5000;
// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true,
// })); // enable cros so frontend apps can access this API

// app.use(express.json()); //parse JSON bodies in requests ( post , put )
// app.use(cookieParser());

// const dbPool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,

// });

// async function testDBConnection() {
//   try {
//     const connection = await dbPool.getConnection();
//     console.log("Connected to MySQL.");
//     connection.release();
//   } catch (err) {
//     console.error("DB Connection Failed:", err);
//     process.exit(1);
//   }
// }

// testDBConnection();



// app.get("/products", async (req, res) => {
//   try {
//     const [products] = await dbPool.query("SELECT * FROM products");
//     res.json(products); //send result as JSON
//   } catch (err) {
//     console.error("fetch error:", err);
//     res.status(500).json({ success: false, message: "Failed to fetch products." });
//   }
// });
// app.get("/review/:productId", async (req, res) => {
//   try {
//     const productId = req.params.productId;
//     const [result] = await dbPool.query("SELECT * FROM review WHERE productId = ? ORDER BY date DESC", [productId]);
//     res.json(result);
//   } catch (err) {
//     console.error("fetch error:", err);
//     res.status(500).json({ success: false, message: "Failed to fetch review." });
//   }

// });

// app.post("/review", async (req, res) => {
//   try {
//     const { productId, name, image, email, rating, review } = req.body;
//     const date = new Date();
//     await dbPool.query("insert into review(productId, name, image, email, rating, review,date) VALUES (?, ?, ?, ?, ?, ?,?)", [productId, name, image, email, rating, review, date]);
//     res.json({ success: true, message: "Review added successfully" });

//   } catch (err) {
//     console.error("Failed to add review:", err);
//     res.status(500).json({ success: false, message: "Failed to add review" });
//   }

// })


// app.get("/products/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const [rows] = await dbPool.query("SELECT * FROM products WHERE id = ?", [id]);
//     if (rows.length === 0) return res.status(404).json({ success: false, message: "Product not found" });
//     res.json({ success: true, data: rows[0] });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Server error", error: err });
//   }
// });

// const transporter = nodemailer.createTransport({
//   service: "Gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// app.post("/auth/google", async (req, res) => {
//   try {
//     const { credential } = req.body; // Google ID token

//     const ticket = await googleClient.verifyIdToken({
//       idToken: credential,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });

//     const payload = ticket.getPayload();

//     const googleId = payload.sub;
//     const email = payload.email;
//     const name = payload.name;
//     const avatar = payload.picture;

//     // Check if user exists
//     const [existing] = await dbPool.query(
//       "SELECT * FROM users WHERE google_id = ? OR email = ?",
//       [googleId, email]
//     );

//     let userId;

//     if (existing.length > 0) {
//       const user = existing[0];
//       userId = user.id;

//       if (!user.google_id) {
//         console.log(`Linking Google ID for existing user: ${userId}`);
//         await dbPool.query(
//           "UPDATE users SET google_id = ?, verified = ? WHERE id = ?",
//           [googleId, true, userId]

//         );
//       }

 
//       await dbPool.query(
//         "UPDATE users SET avatar=? WHERE id=?",
//         [avatar, userId]
//       );
//     } else {

//       const [result] = await dbPool.query(
//         "INSERT INTO users (name, email, google_id, avatar, verified) VALUES (?, ?, ?, ?, ?)",
//         [name, email, googleId, avatar, true]
//       );
//       userId = result.insertId;
//     }

//     // Issue JWT
//     const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
//       expiresIn: "30d",
//     });

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: true,
//       sameSite: "lax",
//       maxAge: 30 * 24 * 60 * 60 * 1000,
//     });

//     res.json({ success: true, message: "Google login successful" });

//   } catch (err) {
//     console.error("Google Login Error:", err);
//     res.status(500).json({ success: false, message: "Google Login failed" });
//   }
// });


// app.post("/signup", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const verificationDurationHours = 1;
//     const expiresAt = new Date(Date.now() + verificationDurationHours * 60 * 60 * 1000);
//     const [existing] = await dbPool.query("Select id,verified,email from users  where email = ?", [email]);
//     const hashed = await bcrypt.hash(password, 10);
//     const token = crypto.randomBytes(32).toString("hex");
//     if (existing.length > 0) {

//       if (existing[0].verified === 1) {
//         return res.status(400).json({ success: false, message: "Email already exists" });

//       } else {
//         await dbPool.query("UPDATE users SET name=?, password=?, verification_token=?, verified=FALSE, verification_expires=? WHERE id=?",
//           [name, hashed, token, expiresAt, existing[0].id])
//       }

//     } else {
//       await dbPool.query("insert into users (name,email,password, verification_token,verification_expires) VALUES (?,?,?,?,?)", [name, email, hashed, token, expiresAt]);
//     }


//     const verifyLink = `http://localhost:5000/verify?token=${token}`;
//     try {
//       await transporter.sendMail({
//         from: process.env.EMAIL_USER,
//         to: email,
//         subject: "Verify Your Account",
//         html: `<p>Hello ${name},</p>
//         <p>Please verify your account by clicking the button below:</p>
//         <a href=${verifyLink} style="padding:10px 20px; background-color:#4CAF50; color:white; text-decoration:none; border-radius:5px;">
//         Verify Email</a>
//         `
//       });
//       console.log("Email sent successfully to", email);

//     } catch (err) {
//       console.error("Failed to send email:", err);
//     }


//     res.json({ success: true, message: "Check your email to verify your account." });

//   } catch (err) {
//     console.error("Failed to add review:", err);
//     res.status(500).json({ success: false, message: "Failed to add review" });
//   }
// })

// function scheduleCleanupJob() {

//   schedule.scheduleJob('0 * * * *', async () => {
//     console.log(`\n--- Running Hard Deletion Cleanup Job at ${new Date().toISOString()} ---`);
//     try {
//       const now = new Date();

//       const [result] = await dbPool.query(
//         "DELETE FROM users WHERE verified = FALSE AND verification_expires <= ?",
//         [now]
//       );
//       console.log(`SUCCESS: Hard deleted ${result.affectedRows} expired unverified user records.`);

//     } catch (err) {

//       console.error("CRITICAL FAILURE: Scheduled Hard Deletion Job failed:", err);
//     }
//     console.log('---------------------------------------------------\n');
//   });

//   console.log("Scheduled job successfully started: Hard deletion runs hourly.");
// }


// app.get("/verify", async (req, res) => {
//   try {
//     const { token } = req.query;
//     const [user] = await dbPool.query("SELECT * FROM users WHERE verification_token = ?", [token]);
//     if (!user.length) return res.status(400).send("Invalid token");

//     await dbPool.query("update users set verified=true, verification_token = NULL,verification_expires = NULL WHERE id = ?",
//       [user[0].id]
//     );
//     res.redirect("http://localhost:5173/login");
//   } catch (err) {
//     res.status(500).send("Server error");
//   }
// })

// app.post("/login", async (req, res) => {
//   const { email, password, remember } = req.body;

//   try {
//     const [rows] = await dbPool.query("Select id,email,password,verified from users where email = ? ", [email]);
//     const user = rows[0];
//     if (!user) { return res.status(401).json({ success: false, message: "Email not found" }); }
//     if (!user.verified) return res.status(401).json({ success: false, message: "Please verify your email first" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ success: false, message: "Incorrect password" });
//     }

//     const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "2h" });

//     const longMs = 30 * 24 * 60 * 60 * 1000;
//     const shortMs = 2 * 60 * 60 * 1000;
//     const cookiAge = remember ? longMs : shortMs;

//     res.cookie("token", token, {
//       httpOnly: true, //only server can read the cookie
//       secure: false,
//       sameSite: "lax",
//       maxAge: cookiAge
//     })
//     res.json({ success: true, message: "Login successful" });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Login failed" });
//   }

// });

// app.get("/me", async (req, res) => {
//   const token = req.cookies.token;
//   if (!token) return res.status(401).json({ success: false, message: "Not logged in" });
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     res.json({ success: true, message: "Logged in", userId: decoded.id });
//   } catch (err) {
//     res.status(401).json({ success: false, message: "Not logged in" });
//   }

// });

// app.post("/logout", (req, res) => {
//   res.cookie("token", "", {
//     httpOnly: true,
//     secure: false,
//     sameSite: "lax",
//     expires: new Date(0),
//   });
//   res.json({ success: true, message: "Logged out" });
// });

import app from "./app.js"
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT || 5000

console.log("SERVER FILE STARTED");
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  // scheduleCleanupJob();
})