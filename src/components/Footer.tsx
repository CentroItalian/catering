import React from 'react'
import { FaYelp, FaPhone, FaLocationDot, FaInstagram } from 'react-icons/fa6'
import { MdEmail } from "react-icons/md";
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[#000] text-center py-10 text-white flex items-center justify-center flex-col">
      <div className='flex flex-row mb-10 gap-4'>

        <Link href={"http://www.yelp.com/biz/mgm-roast-beef-washington"} target='_blank' rel='noopener noreferrer'>
          <div className={`rounded-lg flex justify-center items-center w-12 h-12 bg-[#FF1A1A] ease-in-out duration-300 hover:opacity-80`} title='Yelp'>
            <FaYelp className="text-3xl cursor-pointer" />
          </div>
        </Link>

        <Link href={"tel:301-467-2289"} target='_blank' rel='noopener noreferrer'>
          <div className={`rounded-lg flex justify-center items-center w-12 h-12 bg-[#25D366] ease-in-out duration-300 hover:opacity-80`} title='Phone'>
            <FaPhone className="text-3xl cursor-pointer" />
          </div>
        </Link>

        <Link href={"mailto:orders@mgmroastbeef.com"} target='_blank' rel='noopener noreferrer'>
          <div className={`rounded-lg flex justify-center items-center w-12 h-12 bg-[#6495ED] ease-in-out duration-300 hover:opacity-80`} title='Mail'>
            <MdEmail className="text-3xl cursor-pointer" />
          </div>
        </Link>

        <Link href={"https://instagram.com/mgmroastbeef/"} target='_blank' rel='noopener noreferrer'>
          <div className={`rounded-lg flex justify-center items-center w-12 h-12 bg-[#e1306c] ease-in-out duration-300 hover:opacity-80`} title='Instagram'>
            <FaInstagram className="text-3xl cursor-pointer" />
          </div>
        </Link>

        <Link href={"https://maps.app.goo.gl/eJi4B8chyELJaVHJ7"} target='_blank' rel='noopener noreferrer'>
          <div className={`rounded-lg flex justify-center items-center w-12 h-12 bg-[#E49B0F] ease-in-out duration-300 hover:opacity-80 `} title='Location'>
            <FaLocationDot className="text-3xl cursor-pointer" />
          </div>
        </Link>
        
      </div>
      <p className="font-semibold text-xl">905 Brentwood Rd NE, Washington, DC 20018 | Phone: 301-467-2289</p>
      <p className="text-xl font-semibold mt-4">{`© ${new Date().getFullYear()} Centro Italian Catering. All rights reserved.`}</p>
    </footer>
  )
}

export default Footer