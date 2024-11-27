import Link from 'next/link';
import React from 'react'

interface NavLinkProps {
  name: string;
  route: string;
  onClick?: () => void;
  pathname: string;
}

const NavLink: React.FC<NavLinkProps> = ({ name, route, onClick, pathname }) => {
  const isActive = pathname === route;

  return (
    <div
      className={`navbar-item text-center text-3xl font-nunito transition-all duration-300 ease-in-out font-bold cursor-pointer ${
        isActive ? 'text-yellow-300' : 'text-white hover:text-yellow-300'
      }`}
      onClick={onClick}
    >
      <Link href={route}>{name}</Link>
    </div>
  );
};

export default NavLink;
