import BackgroundSlideshow from '@/components/BackgroundSlideshow';
import Navbar from '@/components/Navbar/Navbar';
import Link from 'next/link';

export default function Home() {
  return (
    <div data-theme="fantasy">
      <div>
        <section id="home" className="hero text-white py-32 flex flex-col items-center text-center min-h-screen justify-center relative">
          {/* Navbar positioned at the top */}
          <div className="absolute top-0 left-0 w-full z-20">
            <Navbar />
          </div>

          <div className="absolute inset-0 overflow-hidden">
            <BackgroundSlideshow />
            <div className="absolute inset-0 bg-gradient-to-b from-black/15 to-black/30 z-0"></div>
          </div>

          {/* Hero Content */}
          <div className="z-10 font-italiana flex flex-col gap-5">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold">CENTRO</h1>
              <h1 className="text-3xl md:text-5xl font-bold">Italian Catering</h1>
            </div>
            <Link href="/order">
              <button className="btn bg-yellow-300 rounded-3xl px-6 md:px-10 py-2 text-lg md:text-2xl">
                Order Online
              </button>
            </Link>
          </div>
        </section>
      </div>


      <footer>
        meow
      </footer>
    </div >
  );
}
