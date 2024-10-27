"use server";

import { sendMail } from '@/lib/mail/NodeMailer';
import { ContactFormTemplate } from '@/lib/mail/templates/ContactFormTemplate';

export default async function sendContactMail(formData: any) {

    sendMail(
        {
            from: `${formData.name} | ${formData.email}`, 
            to: "akshat00jain@gmail.com", 
            subject: "Contact Form Submission",
            html: ContactFormTemplate(formData.name, formData.email, "Reaching Out", formData.message) 
        }
    );
}