import nodemailer from "nodemailer";

export const mailSender = async (
  email: string,
  title: string,
  body: string
) => {
  try {
    // Create a Transporter to send emails
    let transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: "diju eylw dplu zcwh",
      },
    });
    // Send emails to users
    let info = await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: title,
      html: body,
    });
    return info;
  } catch (error) {
    throw new Error(error);
  }
};
