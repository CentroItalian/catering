import React from 'react'
import { FaYelp, FaPhone, FaLocationDot, FaInstagram } from 'react-icons/fa6'
import { MdEmail } from "react-icons/md";
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[#000] text-center py-10 text-white flex items-center justify-center flex-col">
      <div className='flex flex-row mb-10 gap-4'>

        <Link href={"https://www.youtube.com/"} target='_blank' rel='noopener noreferrer'>
          <div className={`rounded-lg flex justify-center items-center w-12 h-12 bg-[#FF1A1A]`} >
            <FaYelp className="text-3xl cursor-pointer" />
          </div>
        </Link>

        <Link href={"tel:202-248-0389"} target='_blank' rel='noopener noreferrer'>
          <div className={`rounded-lg flex justify-center items-center w-12 h-12 bg-[#25D366]`} >
            <FaPhone className="text-3xl cursor-pointer" />
          </div>
        </Link>

        <Link href={"mailto:e"} target='_blank' rel='noopener noreferrer'>
          <div className={`rounded-lg flex justify-center items-center w-12 h-12 bg-[#6495ED]`} >
            <MdEmail className="text-3xl cursor-pointer" />
          </div>
        </Link>

        <Link href={"https://www.google.com/maps"} target='_blank' rel='noopener noreferrer'>
          <div className={`rounded-lg flex justify-center items-center w-12 h-12 bg-[#e1306c]`} >
            <FaInstagram className="text-3xl cursor-pointer" />
          </div>
        </Link>
        
      </div>
      <p className="font-semibold font-italiana text-xl">905 Brentwood Rd NE, Washington, DC 20018 | Phone: 202-248-0389</p>
      <p className="text-xl font-semibold font-italiana mt-4">{`© ${new Date().getFullYear()} Centro AL VOLO. All rights reserved.`}</p>
    </footer>
  )
}

export default Footer