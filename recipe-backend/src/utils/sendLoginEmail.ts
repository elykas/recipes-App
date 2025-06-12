import dotenv from "dotenv"
import { Resend } from "resend";


const resend = new Resend(process.env.RESEND_API_KEY);

export const sendLoginEmail = async (email: string, link: string) => {
  try {
    const response = await resend.emails.send({
      from: 'Recipe App <no-reply@brachikassab.co.il>',
      to: email,
      subject: 'Login to your account',
      html: `<p>Click <a href="${link}">here</a> to log in.</p>`,
    });
    console.log("Email sent:", response);
  } catch (error) {
    console.error("Failed to send email:", error);
  }
};