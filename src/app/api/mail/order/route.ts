import { ContactFormTemplate } from '@/lib/mail/templates/ContactFormTemplate';
import { OrderTemplate } from '@/lib/mail/templates/OrderTemplate';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const { name, email, cart } = await request.json();

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

  function generateOrderID() {
    return Math.random().toString(36).substring(2, 9).toLowerCase();
  }

  const mailOptions = {
    from: `${name} <${email}>`,
    to: 'akshat00jain@gmail.com',
    subject: `${generateOrderID()} | New order Recieved`,
    html: OrderTemplate(cart, {
        orderNumber: '123',
        deliveryDateTime: '2021-12-31 12:00 PM',
        eventType: 'Wedding',
        guestCount: 100,
        serviceStyle: 'Buffet',
        venue: 'The Grand Ballroom',
        address: '123 Main St, Springfield, IL 62701',
        contactName: 'John Doe',
        contactPhone: '217-555-1234',
    }),
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Error sending email' }, { status: 500 });
  }
}
