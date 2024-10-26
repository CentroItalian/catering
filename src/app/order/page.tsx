"use client";

import React, { useState } from 'react';
import { Minus, Plus, Send } from 'lucide-react';
import Image from "next/image";

import { menuItems } from '@/lib/MenuItems';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer';

const CateringOrder = () => {

  const [orders, setOrders] = useState<{ [key: string]: { quantity: number; comments: string } }>(
    Object.fromEntries(menuItems.map(item => [item.name, { quantity: 0, comments: '' }]))
  );

  const [showConfirmation, setShowConfirmation] = useState(false);

  const updateQuantity = (itemName: string, newQuantity: number) => {
    setOrders(prev => ({
      ...prev,
      [itemName]: { ...prev[itemName], quantity: Math.max(0, newQuantity) }
    }));
  };

  const updateComments = (itemName: string, comments: string) => {
    setOrders(prev => ({
      ...prev,
      [itemName]: { ...prev[itemName], comments }
    }));
  };

  const handleSubmit = () => {
    setShowConfirmation(true);
    // Email sending logic would go here
  };

  const categories = Array.from(new Set(menuItems.map(item => item.category)));

  return (
    <div className="min-h-screen bg-[#d7cece]">

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

      <div className="max-w-4xl mx-auto flex justify-center items-center flex-col">
        {showConfirmation ? (
          <div className="p-6 text-center bg-white/80 backdrop-blur rounded-md shadow-md">
            <h2 className="text-2xl font-serif text-sage-800 mb-4">Thank You for Your Order!</h2>
            <p className="text-sage-600">The invoice has been sent, and our team will contact you soon.</p>
          </div>
        ) : (
          <>
            {categories.map(category => (
              <div key={category} className="flex flex-col">
                <h2 className="text-4xl font-serif text-sage-800 mb-6 text-center">{category}</h2>

                {menuItems
                  .filter(item => item.category === category)
                  .map((item, index) => (
                    <div key={index} className="mb-6 bg-white/80 backdrop-blur p-6 rounded-md shadow-md">
                      <div className="flex justify-between items-start">
                        <div className="flex-grow">
                          <h3 className="text-xl font-serif text-sage-800">{item.name}</h3>
                          <p className="text-sage-600 mt-2">{item.description}</p>
                          <p className="text-sage-500 text-sm mt-1">{item.serves}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            className="p-2 border rounded"
                            onClick={() => updateQuantity(item.name, orders[item.name].quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <input
                            type="number"
                            value={orders[item.name].quantity}
                            onChange={(e) => updateQuantity(item.name, parseInt(e.target.value) || 0)}
                            className="w-16 text-center border rounded"
                            min="0"
                          />
                          <button
                            className="p-2 border rounded"
                            onClick={() => updateQuantity(item.name, orders[item.name].quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <textarea
                        placeholder="Special instructions or comments..."
                        className="mt-4 w-full border rounded p-2"
                        value={orders[item.name].comments}
                        onChange={(e) => updateComments(item.name, e.target.value)}
                      />
                    </div>
                  ))}
              </div>
            ))}

            <div className="text-center mb-5">
              <button onClick={handleSubmit} className="flex flex-row btn bg-yellow-300">
                <Send className="mr-2 h-4 w-4" />
                Generate Invoice and Send
              </button>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CateringOrder;
