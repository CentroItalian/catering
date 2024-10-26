import Link from 'next/link';
import React from 'react'

interface NavLinkProps {
  name: string;
  route: string;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ name, route, onClick }) => {
  return (
    <div
      className="navbar-item text-3xl text-white hover:text-yellow-300 transition-all duration-300 ease-in-out font-italiana font-bold cursor-pointer"
      onClick={onClick}
    >
      <Link href={route}>{name}</Link>
    </div>
  );
};

export default NavLink;
