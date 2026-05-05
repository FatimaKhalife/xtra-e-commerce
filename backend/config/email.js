import nodemailer from "nodemailer";

// TRANSPORTER
export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// VERIFY CONNECTION
transporter.verify((error) => {
    if (error) {
        console.log("SMTP ERROR:", error);
    } else {
        console.log("SMTP READY");
    }
});

// SEND MAIL
export const sendMail = async ({ to, subject, text }) => {
    await transporter.sendMail({
        from: `"Xtra Shop" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        text,
    });
};