import { Resend } from 'resend';

export const sendMail = async ({ to, subject, text }) => {
    await transporter.sendMail({
        from: `"Xtra Shop" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        text
    });
};
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});