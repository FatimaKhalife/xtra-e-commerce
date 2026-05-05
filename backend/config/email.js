import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);

export const sendMail = async ({ to, subject, text }) => {
  await resend.emails.send({
    from:  `"Xtra Shop" <${process.env.EMAIL_USER}>`,
    to: to,
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