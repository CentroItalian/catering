"use client";

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation'
import NavLink from '@/components/Navbar/NavLink';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement | null>(null);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const handleClickOutside = (event: MouseEvent) => {
    if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
      setIsDrawerOpen(false);
    }
  };

  useEffect(() => {
    if (isDrawerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDrawerOpen]);

  const pathname = usePathname();

  return (
    <>
      <nav className="navbar bg-transparent w-full flex justify-between items-center px-4 md:px-10">
        <div className="navbar-start"></div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex navbar-end gap-8 md:gap-8 mr-4 md:mr-10 items-center justify-center">
          <NavLink name="Home" route="/" pathname={pathname} />
          <NavLink name="Order Online" route="/order" pathname={pathname} />
          <NavLink name="Menu" route="/menu" pathname={pathname} />
          <NavLink name="Contact Us" route="/contact" pathname={pathname} />
        </div>

        {/* Hamburger Icon for Mobile */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={toggleDrawer}
          aria-label="Toggle menu"
        >
          {isDrawerOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* Side Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full bg-gray-800 text-white p-6 z-50 transform transition-transform duration-300 ease-in-out ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center gap-8 mt-16">
          <NavLink name="Home" route="/" onClick={toggleDrawer} pathname={pathname} />
          <NavLink name="Order Online" route="/order" onClick={toggleDrawer} pathname={pathname} />
          <NavLink name="Menu" route="/menu" onClick={toggleDrawer} pathname={pathname} />
          <NavLink name="Contact Us" route="/contact" onClick={toggleDrawer} pathname={pathname} />
        </div>
      </div>
    </>
  );
}
