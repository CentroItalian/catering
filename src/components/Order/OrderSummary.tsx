"use client";

import Link from 'next/link';
import Image from 'next/image';
import React from 'react'

import { FaArrowLeft } from "react-icons/fa";

interface OrderSummaryProps {
  cart: {
    name: string;
    quantity: number;
    instructions?: string;
  }[];
  onConfirmOrder: () => void;
  order_type: string;
  formData: {
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
    period: string;
  }
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ cart, onConfirmOrder, order_type, formData }) => {

  return (
    <dialog id="order_summary_modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">

        <div className='flex flex-row justify-start items-center gap-10'>
          <div className='cursor-pointer rounded-full border p-2'>
            <FaArrowLeft
              className='text-gray-500'
              onClick={() => {
                const modal = document.getElementById('order_summary_modal') as HTMLDialogElement;
                if (modal) {
                  modal.close();
                }
                (document.getElementById('user_details_modal') as HTMLDialogElement).showModal();
              }}
              aria-label="Close order summary"
            />
          </div>

          <h1 className='font-yeseva font-normal text-3xl'>
            Order Summary
          </h1>
        </div>

        <div className='mt-5 bg-gray-300 min-h-[150px] max-w-prose p-5 rounded-lg font-nunito font-semibold'>
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
        
        <div className='mt-5'>
          <p>{`Order Type: ${order_type[0].toUpperCase() + order_type.slice(1)}`}</p>

          <p>{`Name: ${formData.name}`}</p>
          {formData.organization && <p>{`Organization: ${formData.organization}`}</p>}
          <p>{`Email: ${formData.email}`}</p>
          <p>{`Phone: ${formData.phone}`}</p>

          
          {order_type === 'delivery' && (
            <div className='mt-5'>
              <p>{`Delivery Date: ${formData.date}`}</p>
              <p>{`Delivery Time: ${formData.time}`}</p>
              <p>{`Delivery Address: \n${formData.address}, ${formData.city}, ${formData.state}, ${formData.zip_code}`}</p>
            </div>
          )}

          {order_type === 'pickup' && (
            <div className='mt-5'>
              <p>{`Pick-up Date: ${formData.date}`}</p>
              <p>{`Pick-up Time: ${formData.time} ${formData.period}`}</p>
            </div>
          )}
        </div>

        <div className='flex flex-row justify-center items-center mt-10 gap-5'>
          <button className='btn' onClick={() => (document.getElementById('order_summary_modal') as HTMLDialogElement).close()}>
            Continue Ordering
          </button>
          <button className='btn btn-success text-white' onClick={onConfirmOrder}>
            Confirm Order
          </button>
        </div>
      </div>
    </dialog>
  )
}

export default OrderSummary;