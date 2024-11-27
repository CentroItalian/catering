"use client";

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const Image = dynamic(() => import('next/image'));

const BackgroundSlideshow = () => {
  const images = [
    "https://utfs.io/a/eonyd8k4es/ii5UkNJjqPWO55YkYGXoKrWhduX0BQzUGtcYlLFj6AVnCxO9",
    "https://utfs.io/a/eonyd8k4es/ii5UkNJjqPWOCSlcbBrDp8bylhtKjEeO3Nvz2V4qG6sFfkSJ"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const preloadImages = () => {
      images.forEach((src) => {
        const img = new window.Image();
        img.src = src;
      });
      setIsLoaded(true);
    };
    preloadImages();
  }, [images]);

  useEffect(() => {
    if (!isLoaded) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length, isLoaded]);

  if (!isLoaded) {
    return <div className="w-full h-screen flex items-center justify-center text-white">Loading...</div>;
  }

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
      <div className="absolute inset-0 bg-slate-700 opacity-70"></div>
    </div>
  );
};

export default BackgroundSlideshow;
