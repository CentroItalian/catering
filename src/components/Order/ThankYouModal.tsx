import React from 'react'

import Link from 'next/link';
import Image from 'next/image';

const ThankYouModal = () => {
  return (
    <dialog id="thank_you_modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">

        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute text-xl right-2 top-2">✕</button>
        </form>

        <div className='flex justify-center items-center flex-col text-center'>
          <h1 className='text-4xl font-bold'>Thank You for your order!</h1>
          <p className='text-2xl mt-4'>Our team will be in touch with you shortly!</p>

          <div className='flex flex-row gap-10 mt-10'>
            <Link href='/'>
              <button className='btn btn-secondary'>Back to Home</button>
            </Link>
            <Link href='/contact'>
              <button className='btn btn-primary'>Contact Us</button>
            </Link>
          </div>
        </div>

        <div className='text-3xl mt-5 mb-3'>
          <h1>Visit Us</h1>
          <Image src={"/map.png"} alt='map' width={600} height={200} className='object-contain' unoptimized />
        </div>
      </div>
    </dialog>
  )
}

export default ThankYouModal