"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import JSConfetti from "js-confetti";

import { menu as menuData } from "@/lib/MenuItems";
import Navbar from '@/components/Navbar/Navbar';

import { AiOutlineShoppingCart } from "react-icons/ai";
import Footer from '@/components/Footer';

interface CartItem {
  name: string;
  quantity: number;
  instructions: string;
}

const OrderPage = () => {
  const [order, setOrder] = useState<{ [key: string]: { quantity: number; instructions: string } }>({});
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartEmpty, setIsCartEmpty] = useState(cart.length === 0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const confettiRef = useRef<JSConfetti | null>(null);

  useEffect(() => {
    setIsCartEmpty(cart.length === 0);
  }, [cart]);

  useEffect(() => {
    confettiRef.current = new JSConfetti({ canvas: canvasRef.current ?? undefined });
  }, []);

  const handleQuantityChange = (itemName: string, increment: boolean) => {
    setOrder((prevOrder) => {
      const currentQuantity = prevOrder[itemName]?.quantity || 0;
      const newQuantity = increment ? currentQuantity + 1 : Math.max(0, currentQuantity - 1);
      return { ...prevOrder, [itemName]: { ...prevOrder[itemName], quantity: newQuantity } };
    });
  };

  const handleInstructionChange = (itemName: string, instructions: string) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      [itemName]: { ...prevOrder[itemName], instructions },
    }));
  };

  const handleAddToCart = () => {
    const newCart = Object.entries(order)
      .filter(([, item]) => item.quantity > 0)
      .map(([name, item]) => ({ name, quantity: item.quantity, instructions: item.instructions || '' }));
    setCart(newCart);
    (document.getElementById('cart_modal') as HTMLDialogElement).showModal()
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Order submitted', cart.length);
    setCart([]);
    setOrder({});
    confettiRef.current?.addConfetti({
      confettiRadius: 5,
      confettiNumber: 300
    });
    (document.getElementById('cart_modal') as HTMLDialogElement).close();

    (document.getElementById('thank_you_modal') as HTMLDialogElement).showModal();
  };

  return (
    <div className="font-semibold bg-[#d7cece]">
      {/* Banner */}
      <div id="banner" className="relative h-[300px] sm:h-[416px] w-full mb-5">
        <div className="absolute top-0 left-0 w-full z-20">
          <Navbar />
        </div>
        <Image src="/banner.jpg" alt="banner" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="absolute inset-0 flex items-center justify-center text-white text-4xl sm:text-6xl font-bold">
          Centro Italian Catering
        </div>
      </div>

      {/* Menu */}
      {menuData.map((menu) => (
        <div key={menu.category} className="mt-6 p-4">
          <h2 className="text-5xl font-bold pb-2">{menu.category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {menu.items.map((item) => (
              <div key={item.name} className="border p-4 rounded-lg bg-white">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-gray-600">{item.description}</p>
                <p className="text-gray-500">Serves: {item.serves}</p>

                <div className="flex items-center mt-2">
                  <button
                    className="bg-gray-300 px-2 rounded-lg"
                    onClick={() => handleQuantityChange(item.name, false)}
                  >
                    -
                  </button>
                  <span className="px-4">{order[item.name]?.quantity || 0}</span>
                  <button
                    className="bg-gray-300 px-2 rounded-lg"
                    onClick={() => handleQuantityChange(item.name, true)}
                  >
                    +
                  </button>
                </div>

                <textarea
                  className="mt-2 w-full p-2 border rounded-lg resize-none"
                  placeholder="Special instructions"
                  value={order[item.name]?.instructions || ''}
                  onChange={(e) => handleInstructionChange(item.name, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      <div id="blank_box" className='bg-transparent py-10 w-full'></div>

      {/* Add to Cart Button */}
      <div className="fixed bottom-80 sm:bottom-64 left-0 right-0 flex justify-center z-50">
        <button
          className="bg-green-500 text-white py-2 px-4 rounded-lg flex items-center gap-2"
          onClick={handleAddToCart}
        >
          <AiOutlineShoppingCart size={24} />
          Add to Cart
        </button>
      </div>


      <Footer />

      {/* Cart Modal */}
      <dialog id="cart_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h2 className="text-xl font-bold mb-4">Cart</h2>
          {cart.length > 0 ? (
            cart.map((cartItem) => (
              <div key={cartItem.name} className="flex justify-between mb-2">
                <div>
                  <span className="font-semibold">{cartItem.name}</span>
                  <span className="text-gray-500"> x {cartItem.quantity}</span>
                  {cartItem.instructions && (
                    <p className="text-sm text-gray-400">Instructions: {cartItem.instructions}</p>
                  )}
                </div>
                {/* <div className="text-right font-semibold">{cartItem.quantity}</div> */}
              </div>
            ))
          ) : (
            <p className="text-gray-500">Your cart is empty</p>
          )}

          <form onSubmit={handleSubmitOrder}>
            <button className="btn btn-success mr-5" type="submit" disabled={isCartEmpty}>Place Order</button>
            <button className="btn" type='button' onClick={() => (document.getElementById('cart_modal') as HTMLDialogElement).close()}>Close</button>
          </form>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      {/* Contact Detail Modal */}

      {/* Thank You Modal */}
      <dialog id="thank_you_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">

          <div className='flex justify-center items-center flex-col'>
            <h1 className='text-4xl font-bold'>Thank You for your order!</h1>
            <p className='text-2xl mt-4'>Our team will be in touch with you shortly!</p>

            <div className='flex flex-row gap-10 mt-10'>
              <Link href='/'>
                <button className='btn btn-secondary'>Back to Home</button>
              </Link>
              <Link href='/contact'>
                <button className='btn btn-primary'>Contact Us</button>
              </Link>
              <button className="btn" type='button' onClick={() => (document.getElementById('thank_you_modal') as HTMLDialogElement).close()}>
                Close
              </button>
            </div>
          </div>

          <div className='text-3xl mt-5 mb-3'>
            <h1>Visit Us</h1>
            <Image src={"/map.png"} alt='map' width={600} height={200} className='object-contain' unoptimized />
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default OrderPage;
