"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import JSConfetti from "js-confetti";

import { menu as menuData } from "@/lib/MenuItems";
import Navbar from '@/components/Navbar/Navbar';

import { z } from "zod";

import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

import Footer from '@/components/Footer';
import ReadMoreDialogue from '@/components/ReadMoreDialogue';
import ReturnToTop from '@/components/ReturnToTop';
import OrderSummary from '@/components/Order/OrderSummary';
import ThankYouModal from '@/components/Order/ThankYouModal';
import TimeInput from '@/components/Inputs/TimeInput';

interface FormErrors {
  name?: { _errors: string[] };
  organization?: { _errors: string[] };
  email?: { _errors: string[] };
  phone?: { _errors: string[] };
  date?: { _errors: string[] };
  time?: { _errors: string[] };
  address?: { _errors: string[] };
  city?: { _errors: string[] };
  state?: { _errors: string[] };
  zip_code?: { _errors: string[] };
}

interface FormData {
  name: string;
  organization: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  instructions: string;
  period: string;
}

interface CartItem {
  name: string;
  quantity: number;
  instructions: string;
}

const orderSchema = z.object({
  name: z.string().min(1, "Name is required"),
  organization: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .regex(/^\(\d{3}\) \d{3}-\d{4}$/, "Phone must be in the format (123) 456-7890"),
  date: z.string().min(1, "Date is required"),
  time: z
    .string()
    .min(1, "State is required")
    .refine((value) => value !== "select", {
      message: "Please select a valid time",
    }),
  address: z.string().optional().or(z.literal("")),
  city: z.string().min(1, "City is required"),
  state: z
    .string()
    .min(1, "State is required")
    .refine((value) => value !== "state", {
      message: "Please select a valid state",
    }),
  zip_code: z.string().min(5, "ZIP Code must be 5 digits"),
  instructions: z.string().optional().or(z.literal("")),
  period: z.enum(["AM", "PM"]).optional(),
});

const OrderPage = () => {
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    date: '',
    time: 'select',
    address: '',
    city: '',
    state: 'state',
    zip_code: '',
    instructions: '',
    period: 'AM',
  });


  const [order, setOrder] = useState<{ [key: string]: { quantity: number; instructions: string } }>({});
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');
  const [isCartEmpty, setIsCartEmpty] = useState(cart.length === 0);
  const [buttonStyle, setButtonStyle] = useState<{ position: 'fixed' | 'absolute', bottom: number }>({
    position: 'fixed',
    bottom: 0
  });

  const now = new Date();

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

          setButtonStyle({
            position: 'absolute',
            bottom: footerRef.current.offsetHeight
          });
        } else {

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

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prevData: FormData) => ({
      ...prevData,
      state: event.target.value,
    }));
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prevData: FormData) => ({
      ...prevData,
      time: event.target.value,
    }));
  }

  const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prevData: FormData) => ({
      ...prevData,
      period: event.target.value,
    }));
  }

  const onFormValueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;

    setFormData((prevData: FormData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'phone') {
      const rawValue = value.replace(/\D/g, '');
      let formattedPhone = rawValue;
      if (rawValue.length >= 4 && rawValue.length <= 6) {
        formattedPhone = `(${rawValue.slice(0, 3)}) ${rawValue.slice(3)}`;
      } else if (rawValue.length >= 7) {
        formattedPhone = `(${rawValue.slice(0, 3)}) ${rawValue.slice(3, 6)}-${rawValue.slice(6, 10)}`;
      }
      setFormData((prevData: FormData) => ({ ...prevData, phone: formattedPhone }));
    }
  }

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

    let validationResult;
    if (orderType === 'pickup') {
      const { address, city, state, zip_code, ...pickupFormData } = formData;
      validationResult = orderSchema.omit({ address: true, city: true, state: true, zip_code: true }).safeParse(pickupFormData);
    } else {
      validationResult = orderSchema.safeParse(formData);
    }

    if (!validationResult.success) {
      const formattedErrors = validationResult.error.format();
      console.log(formattedErrors);
      setErrors(formattedErrors);
      return;
    }

    (document.getElementById('user_details_modal') as HTMLDialogElement).close();
    (document.getElementById('order_summary_modal') as HTMLDialogElement).showModal();
  };

  const onConfirmOrder = async () => {
    setCart([]);
    setOrder({});
    setCartQuantity(0);

    setFormData({
      name: '',
      organization: '',
      email: '',
      phone: '',
      date: '',
      time: 'select',
      address: '',
      city: '',
      state: 'state',
      zip_code: '',
      instructions: '',
      period: 'AM',
    });

    confettiRef.current?.addConfetti({
      confettiRadius: 5,
      confettiNumber: 300
    });

    (document.getElementById('order_summary_modal') as HTMLDialogElement).close();
    (document.getElementById('thank_you_modal') as HTMLDialogElement).showModal();

    await fetch('/api/mail/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CONTACT_FORM_TOKEN}`,
      },
      body: JSON.stringify({ cart, order_type: orderType, ...formData }),
    });

    if (orderType === "pickup") {
      await fetch("/api/sheets/order/pickup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CONTACT_FORM_TOKEN}`,
        },
        body: JSON.stringify({ cart, order_type: orderType, ...formData }),
      });
    } else {
      await fetch("/api/sheets/order/delivery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CONTACT_FORM_TOKEN}`,
        },
        body: JSON.stringify({ cart, order_type: orderType, ...formData }),
      });
    }
  }

  const handleRemoveFromCart = (name: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.name !== name));
    setOrder((prevOrder) => {
      const newOrder = { ...prevOrder };
      delete newOrder[name];
      return newOrder;
    });
    setCartQuantity((prevQuantity) => {
      const item = cart.find((item) => item.name === name);
      return item ? prevQuantity - item.quantity : prevQuantity;
    });
  };

  return (
    <div className="font-semibold bg-[#d7cece] relative !scroll-smooth">
      {/* Banner */}
      <div id="banner" className="relative h-[300px] sm:h-[416px] w-full mb-5">
        <div className="absolute top-0 left-0 w-full z-20">
          <Navbar />
        </div>
        <Image src="/banner.jpg" alt="banner" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-slate-700 opacity-70"></div>
        <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
          {/* Centro Italian Catering */}
          <Image
            src="/logos/logo_transparent.png"
            width={400}
            height={400}
            alt="Centro Italian Catering"
            priority
            className='w-2/3 sm:w-1/4'
          />
        </div>
      </div>

      {/* Menu */}
      {menuData.map((menu) => (

        <div key={menu.category} id={menu.id} className="mt-6 p-10">
          <h2 className="text-5xl font-bold pb-2">{menu.category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {menu.items.map((item) => (
              <div key={item.name} className="border p-4 rounded-lg bg-white">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <div className="text-gray-600">
                  {
                    item.description.length > 150
                      ? (
                        <div>
                          {item.description.slice(0, 150) + " . . . .   "}
                          <ReadMoreDialogue
                            description={item.description}
                            item_name={item.name.replace(" ", "_")}
                            item={item}
                            order={order}
                            setOrder={setOrder}
                            handleQuantityChange={handleQuantityChange}
                            handleInstructionChange={handleInstructionChange}
                          />
                          <span className='text-blue-500 cursor-pointer' onClick={() => {
                            (document.getElementById(`read_more_dialogue_${item.name.replace(" ", "_")}`) as HTMLDialogElement).showModal();
                          }}>Read More</span>
                        </div>
                      )
                      : item.description
                  }
                </div>
                {/* <p className="text-gray-600">{item.description}</p> */}
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
              <div key={cartItem.name} className='flex justify-between'>
                <div className="flex justify-between mb-2">
                  <div>
                    <span className="font-semibold">{cartItem.name}</span>
                    <span className="text-gray-500"> x {cartItem.quantity}</span>
                    {cartItem.instructions && (
                      <p className="text-sm text-gray-400">Instructions: {cartItem.instructions}</p>
                    )}
                  </div>
                </div>

                <MdDelete color='#7393B3' className='cursor-pointer' onClick={() => handleRemoveFromCart(cartItem.name)} />
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
              Order More
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
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost fixed right-4 top-4 text-2xl">✕</button>
          </form>
          <form onSubmit={handleSubmitOrder}>
            <div className="flex flex-col gap-3 m-3">

              <div className="form-control">
                <div className='flex flex-col justify-center items-center mb-3'>
                  <h2 className="text-2xl font-semibold">Order Summary</h2>
                  <div className='mt-5 min-h-[150px] w-full p-5 rounded-lg font-nunito font-semibold mb-5 border border-black'>
                    {cart.length > 0 ? (
                      cart.map((cartItem) => (
                        <div key={cartItem.name} className="flex justify-between mb-2">
                          <div>
                            <span className="font-semibold">{cartItem.name}</span>
                            <span className="text-gray-500"> x {cartItem.quantity}</span>
                            {cartItem.instructions && (
                              <p className="text-sm text-gray-600">Instructions: {cartItem.instructions}</p>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">Your cart is empty</p>
                    )}
                  </div>
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

                {orderType == "pickup" && (
                  <div className="flex flex-col gap-3">
                    <label htmlFor='name' className='input input-bordered flex items-center gap-2'>
                      <input type="text" placeholder="Name *" name='name' className="grow" value={formData.name} onChange={onFormValueChange} />
                    </label>
                    {errors.name && <p className="text-red-500 text-sm">{errors.name._errors[0]}</p>}

                    <label htmlFor='organization' className='input input-bordered flex items-center gap-2'>
                      <input type="text" placeholder="Organization" name='organization' value={formData.organization} onChange={onFormValueChange} />
                    </label>
                    {errors.organization && <p className="text-red-500 text-sm">{errors.organization._errors[0]}</p>}

                    <label htmlFor='email' className='input input-bordered flex items-center gap-2'>
                      <input type="email" placeholder="Email *" name='email' className="grow" value={formData.email} onChange={onFormValueChange} />
                    </label>
                    {errors.email && <p className="text-red-500 text-sm">{errors.email._errors[0]}</p>}

                    <label htmlFor='phone' className='input input-bordered flex items-center gap-2'>
                      <input type="text" placeholder="Phone *" name='phone' className="grow" value={formData.phone} onChange={onFormValueChange} />
                    </label>
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone._errors[0]}</p>}

                    {/* Date Picker */}
                    <label className="text-gray-700 font-semibold mb-1">Choose Date</label>
                    <input
                      type="date"
                      name="date"
                      className="input input-bordered border-2 border-gray-300 rounded-lg p-3 focus:border-primary bg-gray-50 hover:bg-gray-100 transition-all duration-150"
                      value={formData.date} onChange={onFormValueChange}
                      min={new Date().toISOString().split("T")[0]}
                      max={new Date(now.setDate(now.getDate() + 14)).toISOString().split("T")[0]}
                    />
                    {errors.date && <p className="text-red-500 text-sm">{errors.date._errors[0]}</p>}

                    {/* Time Picker */}
                    <label className="text-gray-700 font-semibold">Choose Time</label>
                    <TimeInput
                      formData={formData}
                      handlePeriodChange={handlePeriodChange}
                      handleTimeChange={handleTimeChange}
                    />
                    {errors.time && <p className="text-red-500 text-sm">{errors.time._errors[0]}</p>}

                    <label htmlFor='instructions' className="form-control min-w-fit">
                      <textarea
                        className="textarea textarea-bordered min-h-24 resize-none"
                        name='instructions'
                        placeholder="Pickup Instructions"
                        value={formData.instructions}
                        onChange={onFormValueChange}
                      />
                    </label>
                  </div>
                )}

              </div>

              {orderType === "delivery" && (
                <div className="flex flex-col gap-3 min-w-fit">
                  {/* User details fields */}
                  <label htmlFor='name' className='input input-bordered flex items-center gap-2'>
                    <input type="text" placeholder="Name *" name='name' className="grow" value={formData.name} onChange={onFormValueChange} />
                  </label>
                  {errors.name && <p className="text-red-500 text-sm">{errors.name._errors[0]}</p>}

                  <label htmlFor='organization' className='input input-bordered flex items-center gap-2'>
                    <input type="text" placeholder="Organization" name='organization' className="grow" value={formData.organization} onChange={onFormValueChange} />
                  </label>
                  {errors.organization && <p className="text-red-500 text-sm">{errors.organization._errors[0]}</p>}

                  <label htmlFor='email' className='input input-bordered flex items-center gap-2'>
                    <input type="email" placeholder="Email *" name='email' className="grow" value={formData.email} onChange={onFormValueChange} />
                  </label>
                  {errors.email && <p className="text-red-500 text-sm">{errors.email._errors[0]}</p>}

                  <label htmlFor='phone' className='input input-bordered flex items-center gap-2'>
                    <input type="text" placeholder="Phone *" name='phone' className="grow" value={formData.phone} onChange={onFormValueChange} />
                  </label>
                  {errors.phone && <p className="text-red-500 text-sm">{errors.phone._errors[0]}</p>}

                  {/* Address fields */}
                  <label htmlFor='address' className='input input-bordered flex items-center gap-2'>
                    <input type="text" placeholder="Street Address *" name='address' className="grow" value={formData.address} onChange={onFormValueChange} />
                  </label>
                  {errors.address && <p className="text-red-500 text-sm">{errors.address._errors[0]}</p>}

                  <label htmlFor='city' className='input input-bordered flex items-center gap-2'>
                    <input type="text" placeholder="City *" name="city" className="grow" value={formData.city} onChange={onFormValueChange} />
                  </label>
                  {errors.city && <p className="text-red-500 text-sm">{errors.city._errors[0]}</p>}

                  {/* Dropdown for State */}
                  <label htmlFor='state'>
                    <select className="select select-bordered w-full" name='state' value={formData.state} onChange={handleStateChange}>
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
                  </label>
                  {errors.state && <p className="text-red-500 text-sm">{errors.state._errors[0]}</p>}

                  <label htmlFor='zip_code' className='input input-bordered flex items-center gap-2'>
                    <input type="" placeholder="ZIP Code *" name='zip_code' className="grow" maxLength={6} value={formData.zip_code} onChange={onFormValueChange} />
                  </label>
                  {errors.zip_code && <p className="text-red-500 text-sm">{errors.zip_code._errors[0]}</p>}

                  {/* Date Picker */}
                  <label className="text-gray-700 font-semibold mb-1">Choose Date</label>
                  <input
                    type="date"
                    name="date"
                    className="input input-bordered border-2 border-gray-300 rounded-lg p-3 focus:border-primary bg-gray-50 hover:bg-gray-100 transition-all duration-150"
                    value={formData.date} onChange={onFormValueChange}
                    min={new Date().toISOString().split("T")[0]}
                    max={new Date(now.setDate(now.getDate() + 14)).toISOString().split("T")[0]}
                  />
                  {errors.date && <p className="text-red-500 text-sm">{errors.date._errors[0]}</p>}

                  {/* Time Picker */}
                  <label className="text-gray-700 font-semibold mb-1">Choose Time</label>
                  <TimeInput
                    formData={formData}
                    handlePeriodChange={handlePeriodChange}
                    handleTimeChange={handleTimeChange}
                  />
                  {errors.time && <p className="text-red-500 text-sm">{errors.time._errors[0]}</p>}

                  <label htmlFor='instructions' className="form-control gap-2 min-w-fit">
                    <textarea
                      className="textarea textarea-bordered min-h-24 resize-none"
                      name='instructions'
                      placeholder="Delivery Instructions"
                      value={formData.instructions}
                      onChange={onFormValueChange}
                    />
                  </label>
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
      <ThankYouModal />

      {/* Order Summary Modal */}
      <OrderSummary cart={cart} onConfirmOrder={onConfirmOrder} order_type={orderType} formData={formData} />

      {/* Back To Top Button Component */}
      <ReturnToTop />
    </div>
  );
};

export default OrderPage;