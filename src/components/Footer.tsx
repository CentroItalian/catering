import React from 'react'
import FooterSocialIcon from './FooterSocialIcon'
import { FaYoutube, FaPhone, FaLocationDot } from 'react-icons/fa6'
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-[#000] text-center py-10 text-white flex items-center justify-center flex-col">
      <div className='flex flex-row mb-10 gap-4'>
        <FooterSocialIcon url="https://www.youtube.com/" icon={FaYoutube} bgColor='#C70039'/>
        <FooterSocialIcon url="tel:202-248-0389" icon={FaPhone} bgColor='#25D366'/>
        <FooterSocialIcon url="mailto:e" icon={MdEmail} bgColor='#6495ED'/>
        <FooterSocialIcon url="https://www.google.com/maps" icon={FaLocationDot} bgColor='#E1C16E'/>
      </div>
      <p className="font-semibold font-italiana text-2xl">905 Brentwood Rd NE, Washington, DC 20018 | Phone: 202-248-0389</p>
      <p className="text-2xl font-semibold font-italiana mt-4">{`© ${new Date().getFullYear()} Centro AL VOLO. All rights reserved.`}</p>
    </footer>
  )
}

export default Footer