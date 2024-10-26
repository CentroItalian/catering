import React from 'react'
import Image from 'next/image'
import Navbar from '@/components/Navbar/Navbar';

import Menu1 from "@/../public/menu/menu_1.png";
import Menu2 from "@/../public/menu/menu_2.png";

const MenuPage = () => {
  return (
    <div className='font-italiana bg-[#d7cece]'>

      {/* Banner */}
      <div id="banner" className="relative h-[416px] w-full">
        <div className="absolute top-0 left-0 w-full z-20">
          <Navbar />
        </div>
        <Image src="/banner.jpg" alt="banner" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-black opacity-70"></div>

        <div className="absolute inset-0 flex items-center justify-center text-white text-6xl font-bold">
          Catering Menu
        </div>
      </div>

      {/* Menu Section */}
      <div className='flex justify-center items-center flex-col gap-5 py-10'>

        <a
          href="/files/menu.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className='btn rounded-full py-2 px-10 bg-[#f9a826] text-white font-bold text-2xl'
        >
          Download Menu
        </a>

        <Image src={Menu1} alt='Menu1' />
        <Image src={Menu2} alt='Menu2' />
      </div>
    </div>
  )
}

export default MenuPage;
