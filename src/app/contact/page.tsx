import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar/Navbar';
import Link from 'next/link';
import React from 'react'

import { FaUser, FaPhone } from "react-icons/fa";
import { IoMail } from "react-icons/io5";

const ContactPage = () => {
  return (
    <div className='bg-[#d7cece]'>
      <Navbar />
      <div className='flex flex-row justify-center items-center h-screen font-italiana font-semibold'>
        <div className='flex flex-col justify-center items-center w-1/2 text-left pl-12'>

          <div className='text-black'>
            <h1 className='text-6xl font-bold mb-5'>Contact Us</h1>
            <Link href="https://maps.app.goo.gl/HKMGrMCqzZmEWtgFA" target='_blank' rel="noopener noreferrer">
              <p className='text-xl'>
                905 Brentwood Rd NE, Washington, DC 20018
              </p>
            </Link>
            <Link href="tel:202-248-0389" target='_blank' rel="noopener noreferrer">
              <p className='text-xl'>
                Phone: 202-248-0389
              </p>
            </Link>
          </div>

        </div>
        <div className="flex flex-col justify-center items-center w-full max-w-md mx-auto p-6 bg-base-100 shadow-xl rounded-lg text-black">
          <form className="flex flex-col gap-4 w-full">

            <label htmlFor='name' className="input input-bordered flex items-center gap-2">
              <FaUser />
              <input type="text" className="grow" placeholder="Name" name='name' />
            </label>

            <label htmlFor='email' className="input input-bordered flex items-center gap-2">
              <IoMail />
              <input type="text" className="grow" placeholder="E-Mail" name='email' />
            </label>

            <label htmlFor='phone' className="input input-bordered flex items-center gap-2">
              <FaPhone />
              <input type="number" className="grow" placeholder="Phone" name='phone' />
            </label>

            <label className="form-control">
              <div className="label">
                <span className="label-text">Message</span>
              </div>
              <textarea className="textarea textarea-bordered min-h-24 resize-none" placeholder="Message" />
            </label>

            <button className="btn btn-primary">Submit</button>

          </form>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ContactPage;