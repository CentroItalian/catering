"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

const BackgroundSlideshow = () => {
  const images = [
    '/1.jpg',
    '/2.jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="w-full h-screen overflow-hidden z-0">
      {images.map((src, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
        >
          <Image
            src={src}
            alt={`Slideshow image ${index + 1}`}
            fill
            quality={100}
            className="animate-zoom object-cover"
            priority={true}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-black opacity-70"></div>

    </div>
  );
};

export default BackgroundSlideshow;
