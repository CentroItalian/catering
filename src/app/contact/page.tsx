"use client";

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar/Navbar';
import Link from 'next/link';
import React from 'react';

import Map from "@/../public/map.png";

import { FaUser, FaPhone } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import Image from 'next/image';

const ContactPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    (document.getElementById('thank_you_modal') as HTMLDialogElement).showModal();
  };

  return (
    <div className="bg-[#d7cece] font-semibold">
      <Navbar />
      <div className="flex flex-col md:flex-row justify-center items-center h-auto md:h-screen font-italiana font-semibold p-4 md:p-0">
        
        {/* Contact Information Section */}
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 text-left md:pl-12 mb-6 md:mb-0">
          <div className="text-black text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-3 md:mb-5">Contact Us</h1>
            <Link href="https://maps.app.goo.gl/HKMGrMCqzZmEWtgFA" target="_blank" rel="noopener noreferrer">
            <h1 className="text-3xl md:text-4xl font-bold text-center">Centro Italian Catering</h1>
              <p className="text-lg md:text-xl">
                905 Brentwood Rd NE, Washington, DC 20018
              </p>
            </Link>
            <Link href="tel:202-248-0389" target="_blank" rel="noopener noreferrer">
              <p className="text-lg md:text-xl mb-3 md:mb-5">
                Phone: 202-248-0389
              </p>
            </Link>
            <Link href="https://maps.app.goo.gl/HKMGrMCqzZmEWtgFA" target="_blank" rel="noopener noreferrer">
              <Image src={Map} alt="map" className="rounded-lg w-full md:w-3/4" />
            </Link>
          </div>
        </div>
        
        {/* Contact Form Section */}
        <div className="flex flex-col justify-center items-center w-full md:max-w-md p-4 md:p-6 bg-base-100 shadow-xl rounded-lg text-black">
          <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
            <h1 className="text-3xl md:text-4xl font-bold text-center">Centro Italian Catering</h1>

            <label htmlFor="name" className="input input-bordered flex items-center gap-2">
              <FaUser />
              <input type="text" className="grow" placeholder="Name" name="name" required />
            </label>

            <label htmlFor="email" className="input input-bordered flex items-center gap-2">
              <IoMail />
              <input type="text" className="grow" placeholder="E-Mail" name="email" required />
            </label>

            <label htmlFor="phone" className="input input-bordered flex items-center gap-2">
              <FaPhone />
              <input type="number" className="grow" placeholder="Phone" name="phone" required />
            </label>

            <label className="form-control">
              <div className="label">
                <span className="label-text">Message</span>
              </div>
              <textarea className="textarea textarea-bordered min-h-24 resize-none" placeholder="Message" required />
            </label>

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
