import nodemailer from "nodemailer";

interface MailOptions {
    to: string;
    subject: string;
    text: string;
}

export async function sendMail(options: MailOptions) {
    try {
        if (!process.env.NODEMAILER_EMAIL || !process.env.NODEMAILER_PASSWORD) {
            throw new Error("Missing environment variables for nodemailer.");
        }

        const transporter = nodemailer.createTransport({
            host: "smtp.rediffmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASSWORD,
            }
        });


        await transporter.sendMail({
            from: process.env.NODEMAILER_EMAIL,
            to: options.to,
            subject: options.subject,
            text: options.text,
        });
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
}
