"use server";

import { sendMail } from '@/lib/mail/NodeMailer';
import { ContactFormTemplate } from '@/lib/mail/templates/ContactFormTemplate';

export default async function sendContactMail(formData: any) {

    console.log("================ Sending Mail ================");

    sendMail(
        {
            from: `${formData.name} | ${formData.email}`, 
            to: "akshat00jain@gmail.com", 
            subject: "Contact Form Submission",
            html: ContactFormTemplate(formData.name, formData.email, "Reaching Out", formData.message) 
        }
    ).then(() => {
        console.log("Mail Sent Successfully");
    }).catch((err) => {
        console.log("Error in sending mail", err);
    });
}