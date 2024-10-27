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
  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');
  const [isCartEmpty, setIsCartEmpty] = useState(cart.length === 0);
  const [buttonStyle, setButtonStyle] = useState<{ position: 'fixed' | 'absolute', bottom: number }>({
    position: 'fixed',
    bottom: 0
  });

  const footerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const confettiRef = useRef<JSConfetti | null>(null);

  useEffect(() => {
    setIsCartEmpty(cart.length === 0);
  }, [cart]);

  useEffect(() => {
    confettiRef.current = new JSConfetti({ canvas: canvasRef.current ?? undefined });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (footerRef.current) {
        const footerTop = footerRef.current.getBoundingClientRect().top;
        const viewportHeight = window.innerHeight;

        if (footerTop <= viewportHeight) {
          // When footer is visible, position button absolutely above it
          setButtonStyle({
            position: 'absolute',
            bottom: footerRef.current.offsetHeight
          });
        } else {
          // When footer is not visible, keep button fixed at bottom
          setButtonStyle({
            position: 'fixed',
            bottom: 0
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
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
    (document.getElementById('user_details_modal') as HTMLDialogElement).close();
    (document.getElementById('thank_you_modal') as HTMLDialogElement).showModal();
  };

  return (
    <div className="font-semibold bg-[#d7cece] relative">
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
      <div
        className="left-0 right-0 z-50"
        style={{
          position: buttonStyle.position,
          bottom: buttonStyle.position === 'absolute' ? buttonStyle.bottom + 5 : 5
        }}
      >
        <div className="max-w-7xl mx-auto flex justify-center">
          <button
            className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg flex items-center gap-2 transition-colors"
            onClick={handleAddToCart}
          >
            <AiOutlineShoppingCart size={24} />
            Add to Cart
          </button>
        </div>
      </div>


      {/* Footer */}
      <div ref={footerRef}>
        <Footer />
      </div>

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
              </div>
            ))
          ) : (
            <p className="text-gray-500">Your cart is empty</p>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              (document.getElementById('cart_modal') as HTMLDialogElement).close();
              (document.getElementById('user_details_modal') as HTMLDialogElement).showModal();
            }}
          >
            <button className="btn btn-success mr-5" type="submit" disabled={isCartEmpty}>Place Order</button>
            <button className="btn" type='button'
              onClick={() => {
                (document.getElementById('cart_modal') as HTMLDialogElement).close();
              }}
            >
              Close
            </button>
          </form>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      {/* User Details Modal */}
      <dialog id="user_details_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box font-semibold">
          <h2 className="text-xl font-bold mb-4">User Details</h2>
          <form onSubmit={handleSubmitOrder}>
            <div className="flex flex-col gap-3 m-3">

              {/* Radio buttons for Pick-up and Delivery */}
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Pick-up</span>
                  <input
                    type="radio"
                    name="order_type"
                    value="pickup"
                    className="radio checked:bg-blue-500"
                    onChange={(e) => setOrderType(e.target.value as 'pickup' | 'delivery')}
                    checked={orderType === 'pickup'}
                  />
                </label>
                <label className="label cursor-pointer">
                  <span className="label-text">Delivery</span>
                  <input
                    type="radio"
                    name="order_type"
                    value="delivery"
                    className="radio checked:bg-blue-500"
                    onChange={(e) => setOrderType(e.target.value as 'pickup' | 'delivery')}
                    checked={orderType === 'delivery'}
                  />
                </label>
              </div>

              {/* Conditional rendering based on radio selection */}
              {orderType === "pickup" && (
                <div className="flex justify-center">
                  <Image src={"/map.png"} alt='map' width={600} height={200} className='object-contain rounded-lg mb-5' unoptimized />
                </div>
              )}

              {orderType === "delivery" && (
                <div className="flex flex-col gap-3">
                  <input type="text" placeholder="Street Address" name='address' className="input border border-black" required />
                  <input type="text" placeholder="City" name="city" className="input border border-black" required />
                  <input type="number" placeholder="ZIP Code" name='zip_code' className="input border border-black" required />

                  {/* Dropdown for State */}
                  <select className="select border border-black font-semibold" name='state' required>
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="DC">District Of Columbia</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                  </select>
                </div>
              )}

              {/* User details fields */}
              <input type="text" placeholder="Name" name='name' className="input border border-black" />
              <input type="email" placeholder="Email" name='email' className="input border border-black" />
              <input type="tel" placeholder="Phone" name='phone' className="input border border-black" />
            </div>

            <button className="btn btn-success">Submit</button>
            <button className="btn ml-5" type='button' onClick={() => (document.getElementById('user_details_modal') as HTMLDialogElement).close()}>Continue Order</button>
          </form>
        </div>
      </dialog>


      {/* Thank You Modal */}
      <dialog id="thank_you_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">

          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute text-xl right-2 top-2">✕</button>
          </form>

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