import nodemailer from "nodemailer";
import dotenv from "dotenv";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export const sendMail = async (
  receiverEmail: string,
  subject: string,
  body: string
) => {
  await transporter.sendMail({
    from: process.env.EMAIL,
    to: receiverEmail,
    subject: subject,
    html: body,
  });
};
export default sendMail;
