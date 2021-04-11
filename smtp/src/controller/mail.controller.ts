import nodemailer from 'nodemailer';
import { MAIL_INFO } from '../lib/constant';
import { MAIL_SUBJECT } from '../lib/constant';

export async function sendMail(
  targetMailAddress: string,
  authenticationUrl: string
): Promise<string> {
  try {
    const transporter = nodemailer.createTransport({
      service: MAIL_INFO.mailservice,
      auth: {
        user: MAIL_INFO.mailid,
        pass: MAIL_INFO.mailpassword,
      },
    });
    const mailOptions = {
      from: MAIL_INFO.mailid,
      to: targetMailAddress,
      subject: MAIL_SUBJECT,
      text: authenticationUrl,
    };
    await transporter.sendMail(mailOptions);
    transporter.close();
    return 'ok';
  } catch (error) {
    return error.message;
  }
}
