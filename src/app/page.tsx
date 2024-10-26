import BackgroundSlideshow from '@/components/BackgroundSlideshow';
import Navbar from '@/components/Navbar/Navbar';
import Link from 'next/link';

export default function Home() {
  return (
    <div data-theme="fantasy">
      <Navbar />

      <BackgroundSlideshow />

      <div className="relative z-10 flex items-center justify-center h-screen text-white flex-col gap-5 md:gap-7 font-italiana p-4 text-center">
        <div className="flex flex-col items-center justify-center gap-2 md:gap-3">
          <h1 className="text-3xl md:text-5xl font-bold">CENTRO</h1>
          <h1 className="text-3xl md:text-5xl font-bold">Italian Catering</h1>
        </div>
        <div>
          <Link href="/order">
            <button className="btn bg-yellow-300 rounded-3xl px-6 md:px-10 py-2 text-lg md:text-2xl">
              Order Online
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
