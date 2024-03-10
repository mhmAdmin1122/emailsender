// pages/utils/email.ts

import nodemailer from 'nodemailer';

export async function sendEmail(email: string, message: string): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: 'hasaanad12min@gmail.com', // Update with your SMTP host
    port: 587,
    secure: false,
    auth: {
      user: 'hasaanad12min@gmail.com', // Update with your email credentials
      pass: 'ebkk nadi mlnk fvwt', // Update with your email password
    },
  });

  await transporter.sendMail({
    from: 'hasaanad12min@gmail.com',
    to: email,
    subject: 'Subject of the email',
    text: message,
  });
}
