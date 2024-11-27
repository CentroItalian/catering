import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar/Navbar';

import Menu1 from "@/../public/menu/menu-1.png";
import Menu2 from "@/../public/menu/menu-2.png";
import Menu3 from "@/../public/menu/menu-3.png";
import Footer from '@/components/Footer';

const MenuPage = () => {
  return (
    <div className='bg-[#d7cece]'>

      {/* Banner */}
      <div id="banner" className="relative h-[300px] sm:h-[416px] w-full">
        <div className="absolute top-0 left-0 w-full z-20">
          <Navbar />
        </div>
        <Image src="/banner.jpg" alt="banner" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-slate-700 opacity-70"></div>

        <div className="absolute inset-0 flex flex-col gap-5 items-center justify-center text-white text-4xl sm:text-6xl font-medium font-yeseva">
          <Image
            src="/logos/logo_transparent.png"
            width={350}
            height={350}
            alt="Centro Italian Catering"
            priority
            className='w-3/5 sm:w-1/5'
          />
          Catering Menu
        </div>
      </div>

      {/* Menu Section */}
      <div className='flex justify-center items-center flex-col gap-5 py-10'>

        <a
          href="/files/Italian Centro Catering Menu.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className='btn rounded-full py-2 px-6 sm:px-10 bg-[#f9a826] text-white font-bold text-lg sm:text-2xl'
        >
          Download Menu
        </a>

        <div className='w-full max-w-screen-lg px-4 sm:px-10 flex flex-col gap-5 sm:gap-10'>
          <Image src={Menu1} alt='Menu1' priority className="w-full h-auto object-cover" />
          <Image src={Menu2} alt='Menu2' priority className="w-full h-auto object-cover" />
          <Image src={Menu3} alt='Menu3' priority className="w-full h-auto object-cover" />
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default MenuPage;
