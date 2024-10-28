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
  const [cartQuantity, setCartQuantity] = useState(0);
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

    if (increment) {
      setCartQuantity((prevQuantity) => prevQuantity + 1);
    } else {
      setCartQuantity((prevQuantity) => Math.max(0, prevQuantity - 1));
    }

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

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    setCart([]);
    setOrder({});
    confettiRef.current?.addConfetti({
      confettiRadius: 5,
      confettiNumber: 300
    });
    (document.getElementById('user_details_modal') as HTMLDialogElement).close();
    (document.getElementById('thank_you_modal') as HTMLDialogElement).showModal();

    await fetch('/api/mail/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CONTACT_FORM_TOKEN}`,
      },
      body: JSON.stringify({ name: 'Centro Italian Catering', email: 'test@mail.com', cart }),
    });
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
        <div key={menu.category} className="mt-6 p-10">
          <h2 className="text-5xl font-bold pb-2">{menu.category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {menu.items.map((item) => (
              <div key={item.name} className="border p-4 rounded-lg bg-white">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-gray-600">{item.description}</p>
                <p className="text-gray-500">{item.serves}</p>

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
          bottom: buttonStyle.position === 'absolute' ? buttonStyle.bottom + 10 : 10
        }}
      >
        <div className="max-w-7xl mx-auto flex justify-center">
          <button
            className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg flex items-center gap-2 transition-colors"
            onClick={handleAddToCart}
          >
            <AiOutlineShoppingCart size={24} />
            Add to Cart {`( ${cartQuantity} )`}
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
          <h2 className="text-2xl font-bold mb-4">Cart</h2>
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
          {/* <h2 className="text-2xl font-bold mb-4">Order Summary</h2> */}
          <form onSubmit={handleSubmitOrder}>
            <div className="flex flex-col gap-3 m-3">

              {/* Radio buttons for Pick-up and Delivery */}
              <div className="form-control">
                <div className='flex justify-center items-center mb-3'>
                  <div className="flex items-center justify-center p-2 bg-gray-100 rounded-full w-max ">
                    <div
                      onClick={() => setOrderType('pickup')}
                      className={`px-4 py-2 rounded-full cursor-pointer transition-all ${orderType === 'pickup' ? 'bg-white text-black font-semibold' : 'text-gray-500'
                        }`}
                    >
                      Pickup
                    </div>
                    <div
                      onClick={() => setOrderType('delivery')}
                      className={`px-4 py-2 rounded-full cursor-pointer transition-all ${orderType === 'delivery' ? 'bg-white text-black font-semibold' : 'text-gray-500'
                        }`}
                    >
                      Delivery
                    </div>
                  </div>
                </div>


                <div hidden={orderType == "delivery"}>
                  <p className='text-lg font-semibold'><u>Pickup Address</u>:</p>
                  <div className='pl-4'>
                    <p>Centro Italian Catering</p>
                    <p>905 Brentwood Rd NE, Washington, DC 20018</p>
                    <p>Phone: 202-248-0389</p>
                  </div>
                </div>

                {/* Conditional rendering based on radio selection */}
                {orderType === "pickup" && (
                  <div className="flex justify-center">
                    <Image onClick={() => window.open("https://maps.app.goo.gl/eJi4B8chyELJaVHJ7", "_blank", "noopener noreferrer")} src={"/map.png"} alt='map' width={600} height={200} className='object-contain rounded-lg mb-5 cursor-pointer' unoptimized />
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  <input type="text" hidden={orderType == "delivery"} placeholder="Name *" name='name' className="input border border-black" required />
                  <input type="text" hidden={orderType == "delivery"} placeholder="Organization" name='organization' className="input border border-black" />
                  <input type="email" hidden={orderType == "delivery"} placeholder="Email *" name='email' className="input border border-black" required />
                  <input type="tel" hidden={orderType == "delivery"} placeholder="Phone *" name='phone' className="input border border-black" required />
                </div>
              </div>

              {orderType === "delivery" && (
                <div className="flex flex-col gap-3">
                  {/* User details fields */}
                  <input type="text" placeholder="Name *" name='name' className="input border border-black" required />
                  <input type="text" placeholder="Organization" name='organization' className="input border border-black" />
                  <input type="email" placeholder="Email *" name='email' className="input border border-black" required />
                  <input type="tel" placeholder="Phone *" name='phone' className="input border border-black" required />

                  {/* Address fields */}
                  <input type="text" placeholder="Street Address" name='address' className="input border border-black" required />
                  <input type="text" placeholder="City" name="city" className="input border border-black" required />

                  {/* Dropdown for State */}
                  <select className="select border border-black font-semibold" name='state' defaultValue={"state"}>
                    <option hidden disabled value="state"> Select your state </option>
                    <option value="AL" className='font-semibold'>Alabama</option>
                    <option value="AK" className='font-semibold'>Alaska</option>
                    <option value="AZ" className='font-semibold'>Arizona</option>
                    <option value="AR" className='font-semibold'>Arkansas</option>
                    <option value="CA" className='font-semibold'>California</option>
                    <option value="CO" className='font-semibold'>Colorado</option>
                    <option value="CT" className='font-semibold'>Connecticut</option>
                    <option value="DE" className='font-semibold'>Delaware</option>
                    <option value="DC" className='font-semibold'>District Of Columbia</option>
                    <option value="FL" className='font-semibold'>Florida</option>
                    <option value="GA" className='font-semibold'>Georgia</option>
                    <option value="HI" className='font-semibold'>Hawaii</option>
                    <option value="ID" className='font-semibold'>Idaho</option>
                    <option value="IL" className='font-semibold'>Illinois</option>
                    <option value="IN" className='font-semibold'>Indiana</option>
                    <option value="IA" className='font-semibold'>Iowa</option>
                    <option value="KS" className='font-semibold'>Kansas</option>
                    <option value="KY" className='font-semibold'>Kentucky</option>
                    <option value="LA" className='font-semibold'>Louisiana</option>
                    <option value="ME" className='font-semibold'>Maine</option>
                    <option value="MD" className='font-semibold'>Maryland</option>
                    <option value="MA" className='font-semibold'>Massachusetts</option>
                    <option value="MI" className='font-semibold'>Michigan</option>
                    <option value="MN" className='font-semibold'>Minnesota</option>
                    <option value="MS" className='font-semibold'>Mississippi</option>
                    <option value="MO" className='font-semibold'>Missouri</option>
                    <option value="MT" className='font-semibold'>Montana</option>
                    <option value="NE" className='font-semibold'>Nebraska</option>
                    <option value="NV" className='font-semibold'>Nevada</option>
                    <option value="NH" className='font-semibold'>New Hampshire</option>
                    <option value="NJ" className='font-semibold'>New Jersey</option>
                    <option value="NM" className='font-semibold'>New Mexico</option>
                    <option value="NY" className='font-semibold'>New York</option>
                    <option value="NC" className='font-semibold'>North Carolina</option>
                    <option value="ND" className='font-semibold'>North Dakota</option>
                    <option value="OH" className='font-semibold'>Ohio</option>
                    <option value="OK" className='font-semibold'>Oklahoma</option>
                    <option value="OR" className='font-semibold'>Oregon</option>
                    <option value="PA" className='font-semibold'>Pennsylvania</option>
                    <option value="RI" className='font-semibold'>Rhode Island</option>
                    <option value="SC" className='font-semibold'>South Carolina</option>
                    <option value="SD" className='font-semibold'>South Dakota</option>
                    <option value="TN" className='font-semibold'>Tennessee</option>
                    <option value="TX" className='font-semibold'>Texas</option>
                    <option value="UT" className='font-semibold'>Utah</option>
                    <option value="VT" className='font-semibold'>Vermont</option>
                    <option value="VA" className='font-semibold'>Virginia</option>
                    <option value="WA" className='font-semibold'>Washington</option>
                    <option value="WV" className='font-semibold'>West Virginia</option>
                    <option value="WI" className='font-semibold'>Wisconsin</option>
                    <option value="WY" className='font-semibold'>Wyoming</option>
                  </select>
                  <input type="number" placeholder="ZIP Code" name='zip_code' className="input border border-black" required />
                </div>
              )}
            </div>
            
            <div className='flex flex-row justify-center items-center'>
            <button className="btn " type='button' onClick={() => (document.getElementById('user_details_modal') as HTMLDialogElement).close()}>Order More</button>
            <button className="btn ml-5 btn-success">Place Order</button>
            </div>

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