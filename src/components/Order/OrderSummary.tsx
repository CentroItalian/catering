"use client";

import Link from 'next/link';
import Image from 'next/image';
import React from 'react'

interface OrderSummaryProps {
  cart: {
    name: string;
    quantity: number;
    instructions?: string;
  }[];
  onConfirmOrder: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ cart, onConfirmOrder }) => {

  return (
    <dialog id="order_summary_modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">

        <h1 className='font-yeseva font-normal text-3xl'>
          Order Summary
        </h1>

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