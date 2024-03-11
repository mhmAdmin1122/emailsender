import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const readFileAsync = promisify(fs.readFile);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { email, message } = req.body;

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'hasaanad12min@gmail.com',
            pass: 'ebkk nadi mlnk fvwt',
        },
    });

    try {
        // Read the HTML template file
        const htmlTemplate = await readFileAsync(path.join(process.cwd(), 'templates', 'emailTemplate.html'), 'utf-8');

        // Replace placeholders in the template with actual values
        const replacedHtml = htmlTemplate
            .replace('{{recipientName}}', email)
            .replace('{{message}}', message);

        // Send the email with HTML content
        await transporter.sendMail({
            from: 'hasaanad12min@gmail.com',
            to: email,
            subject: 'Subject of the email',
            html: replacedHtml,
        });

        return res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
