"use client";

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar/Navbar';
import Link from 'next/link';
import React, { useState } from 'react';
import { z } from 'zod';

import Map from "@/../public/map.png";
import { FaUser, FaPhone, FaPen } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import Image from 'next/image';

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .regex(/^\(\d{3}\) \d{3}-\d{4}$/, "Phone must be in the format (123) 456-7890"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: "", message: '' });
  const [errors, setErrors] = useState<FormErrors>({});

  interface FormData {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  }

  interface FormErrors {
    name?: { _errors: string[] };
    email?: { _errors: string[] };
    phone?: { _errors: string[] };
    subject?: { _errors: string[] };
    message?: { _errors: string[] };
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;

    setFormData((prevData: FormData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'phone') {
      const rawValue = value.replace(/\D/g, '');
      let formattedPhone = rawValue;
      if (rawValue.length >= 4 && rawValue.length <= 6) {
        formattedPhone = `(${rawValue.slice(0, 3)}) ${rawValue.slice(3)}`;
      } else if (rawValue.length >= 7) {
        formattedPhone = `(${rawValue.slice(0, 3)}) ${rawValue.slice(3, 6)}-${rawValue.slice(6, 10)}`;
      }
      setFormData((prevData: FormData) => ({ ...prevData, phone: formattedPhone }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationResult = contactSchema.safeParse(formData);

    if (!validationResult.success) {
      const formattedErrors = validationResult.error.format();
      setErrors(formattedErrors);
      return;
    }

    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    setErrors({});
    (document.getElementById('thank_you_modal') as HTMLDialogElement).showModal();

    // Send email to the user
    await fetch(`/api/mail/contact_form/`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CONTACT_FORM_TOKEN}`,
      },
      body: JSON.stringify(formData),
    });

    // Add the user to the Google Sheet
    await fetch(`/api/sheets/contact/`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CONTACT_FORM_TOKEN}`,
      },
      body: JSON.stringify(formData),
    });
  };

  const handleMapImageRedirect = () => {
    window.open('https://maps.app.goo.gl/eJi4B8chyELJaVHJ7', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-[#d7cece] font-semibold">
      {/* Banner */}
      <div id="banner" className="relative h-[300px] sm:h-[416px] w-full">
        <div className="absolute top-0 left-0 w-full z-20">
          <Navbar />
        </div>
        <Image src="/banner.jpg" alt="banner" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-slate-700 opacity-70"></div>

        <div className="absolute inset-0 flex gap-5 flex-col items-center justify-center text-white text-4xl sm:text-6xl font-medium font-yeseva">
          <Image
            src="/logos/logo_transparent.png"
            width={350}
            height={350}
            alt="Centro Italian Catering"
            priority
            className='w-3/5 sm:w-1/5'
            unoptimized
          />
          Contact Us
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center h-auto md:h-screen font-semibold p-4 md:p-0">

        {/* Contact Information Section */}
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 text-left md:pl-12 mb-6 md:mb-0 font-nunito">
          <div className="text-black text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-bold">Centro Italian Catering</h1>

            <h1 className="text-lg md:text-xl object-contain">
              905 Brentwood Rd NE, Washington, DC 20018
            </h1>

            <p className="text-lg md:text-xl mb-3 md:mb-5">
              Phone: 301-467-2289
            </p>

            <Image src={Map} alt="map" className="rounded-lg w-full md:w-3/4 cursor-pointer" onClick={() => handleMapImageRedirect()} />
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="flex flex-col justify-center items-center w-full md:max-w-md p-4 md:p-6 bg-base-100 shadow-xl rounded-lg text-black">
          <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
            <h1 className="text-3xl md:text-4xl font-bold text-center">How can we help?</h1>

            <label htmlFor="name" className="input input-bordered flex items-center gap-2">
              <FaUser />
              <input
                type="text"
                className="grow"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </label>
            {errors.name && <p className="text-red-500 text-sm">{errors.name._errors[0]}</p>}

            <label htmlFor="email" className="input input-bordered flex items-center gap-2">
              <IoMail />
              <input
                type="text"
                className="grow"
                placeholder="E-Mail"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>
            {errors.email && <p className="text-red-500 text-sm">{errors.email._errors[0]}</p>}

            <label htmlFor="phone" className="input input-bordered flex items-center gap-2">
              <FaPhone />
              <input
                type="text"
                className="grow"
                placeholder="(123) 456-7890"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </label>
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone._errors[0]}</p>}

            <label htmlFor="subject" className="input input-bordered flex items-center gap-2">
              <FaPen />
              <input
                type="text"
                className="grow"
                placeholder="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              />
            </label>
            {errors.subject && <p className="text-red-500 text-sm">{errors.subject._errors[0]}</p>}

            <label htmlFor='message' className="form-control">
              <div className="label">
                <span className="label-text">Message</span>
              </div>
              <textarea
                className="textarea textarea-bordered min-h-24 resize-none"
                name='message'
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
              />
            </label>
            {errors.message && <p className="text-red-500 text-sm">{errors.message._errors[0]}</p>}

            <button className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>

      <Footer />

      {/* Thank You Modal */}
      <dialog id="thank_you_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="flex justify-center items-center flex-col">
            <h1 className="text-3xl md:text-4xl font-bold">Thank You for reaching out!</h1>
            <p className="text-xl md:text-2xl mt-4">Our team will be in touch with you shortly!</p>

            <div className="flex flex-col md:flex-row gap-4 mt-6">
              <Link href="/">
                <button className="btn btn-secondary w-full md:w-auto">Back to Home</button>
              </Link>
              <button className="btn w-full md:w-auto" type="button" onClick={() => (document.getElementById('thank_you_modal') as HTMLDialogElement).close()}>
                Close
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ContactPage;
