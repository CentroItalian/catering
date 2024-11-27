import nodemailer from "nodemailer";

interface MailOptions {
    from: string;
    to: string;
    subject: string;
    html: string;
}

export async function sendMail(options: MailOptions) {
    try {

        const transporter = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            auth: {
                user: "aviralnandan@gmail.com",
                pass: "evhi suzv zpxu ugei",
            },
        });

        await transporter.sendMail({
            from: options.from,
            to: options.to,
            subject: options.subject,
            html: options.html,
        });

    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
}
