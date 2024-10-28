import { ContactFormTemplate } from '@/lib/mail/templates/ContactFormTemplate';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const { name, email, message, subject } = await request.json();

  console.log(email, name, message, subject);

  const authHeader = request.headers.get('Authorization');
  const secretToken = process.env.CONTACT_FORM_TOKEN;
  if (!authHeader || authHeader !== `Bearer ${secretToken}`) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `${name} <${email}>`,
    to: 'akshat00jain@gmail.com',
    subject: 'Contact Form Submission',
    html: ContactFormTemplate(name, email, 'Reaching Out', message),
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Error sending email' }, { status: 500 });
  }
}
