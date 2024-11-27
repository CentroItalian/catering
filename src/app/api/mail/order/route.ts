import { ContactFormTemplate } from '@/lib/mail/templates/ContactFormTemplate';
import { OrderTemplate } from '@/lib/mail/templates/OrderTemplate';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {

  const data = await request.json();

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

  const orderNum = generateOrderID();

  const mailOptions = {
    from: `${data.name} <${data.email}>`,
    to: 'aviralnandan06@gmail.com',
    subject: `${orderNum} | Italian Centro Catering | New order Received`,
    html: OrderTemplate(data.cart, {
        orderNumber: orderNum,
        deliveryDateTime: `${data.date} at ${data.time} ${data.period}`,
        address: '123 Main St, Springfield, IL 62701',
        contactName: data.name,
        contactPhone: data.phone,
        orderType: data.order_type,
    }),
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Error sending email' }, { status: 500 });
  } finally {
    transporter.close();
  }
}
