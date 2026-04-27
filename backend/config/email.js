import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    service:"Gmail",
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendMail = async ({ to, subject, text }) => {

  await transporter.sendMail({
    from: `"Contact Form" <${process.env.EMAIL_USER}>`,
    to: to,
    subject,
    text
  });
};