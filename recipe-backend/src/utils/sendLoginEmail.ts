import dotenv from "dotenv"
import { Resend } from "resend";


const resend = new Resend(process.env.RESEND_API_KEY);

export const sendLoginEmail = async (email: string, link: string) => {
  await resend.emails.send({
    from: 'no-reply@yourdomain.com',
    to: email,
    subject: 'Login to your account',
    html: `<p>Click <a href="${link}">here</a> to log in.</p>`,
  });
};