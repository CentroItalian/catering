import BackgroundSlideshow from '@/components/BackgroundSlideshow';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar/Navbar';
import Link from 'next/link';
import Image from 'next/image';

import Logo from "@/../public/logos/logo_transparent.png"

export default function Home() {
  return (
    <div data-theme="fantasy">
      <div>
        <section
          id="home"
          className="hero text-white py-20 sm:py-32 flex flex-col items-center text-center min-h-screen justify-center relative"
        >
          {/* Navbar positioned at the top */}
          <div className="absolute top-0 left-0 w-full z-20">
            <Navbar />
          </div>

          <div className="absolute inset-0 overflow-hidden">
            <BackgroundSlideshow />
            <div className="absolute inset-0 bg-gradient-to-b from-black/15 to-black/30 z-0"></div>
          </div>

          {/* Hero Content */}
          <div className="z-10  flex flex-col gap-5">
            {/* <div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">CENTRO</h1>
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">Italian Catering</h1>
            </div> */}
            <div className="flex items-center justify-center">
              <Image
                src={Logo}
                width={400}
                height={400}
                alt="Centro Italian Catering"
                priority
                className="w-1/2 sm:w-1/2"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <Link href="/order">
                <button className="btn bg-yellow-300 min-w-[160px] sm:min-w-[180px] md:min-w-[220px] rounded-3xl px-4 sm:px-6 md:px-10 py-2 text-sm sm:text-lg md:text-2xl">
                  Order Online
                </button>
              </Link>
              <Link href="/menu">
                <button className="btn font-nunito font-bold bg-yellow-300 min-w-[160px] sm:min-w-[180px] md:min-w-[220px] rounded-3xl px-4 sm:px-6 md:px-10 py-2 text-sm sm:text-lg md:text-2xl">
                  View Menu
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* About Us Section */}
      <div className="flex justify-center items-center flex-col px-8 sm:px-16 lg:px-32 py-20 sm:py-28 lg:py-36 text-center bg-[#d7cece]">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium font-yeseva mb-6 sm:mb-8 lg:mb-10">About Us</h1>
        <p className="text-lg sm:text-xl lg:text-2xl font-bold font-nunito">
          At Centro Italian Catering, we bring Italy's vibrant flavors right to your plate! Whether you're hosting an event or dining in our restaurant, we serve authentic sapori italiani (Italian tastes) crafted with passion. From handmade pasta to wood-fired pizzas, every dish is a celebration of Italy’s finest culinary traditions.
          Perfect for catering or enjoying a cozy meal, we promise to deliver gusti genuini (genuine flavors) that transport you to the heart of Italy.
        </p>
        <p className="text-lg sm:text-xl lg:text-2xl font-bold font-nunito mt-4">Savor the experience—buon appetito!</p>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}