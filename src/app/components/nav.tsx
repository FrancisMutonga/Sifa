"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Navbar: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const toggleProductsDropdown = () => {
    setIsProductsOpen(!isProductsOpen);
  };

  const handleMouseEnter = (
    dropdownSetter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
    }
    dropdownSetter(true);
  };

  const handleMouseLeave = (
    dropdownSetter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const timeout = setTimeout(() => {
      dropdownSetter(false);
    }, 200);
    setDropdownTimeout(timeout);
  };

  const handleDrawerLinkClick = () => {
    setTimeout(() => {
      setIsDrawerOpen(false);
    }, 200);
  };

  return (
    <nav
      className="bg-nude fixed top-0 z-50 w-full flex text-black p-4 shadow-[0_4px_4px_-2px_rgba(0,0,0,0.4)]"
      style={{ fontFamily: "SegoeUI" }}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and  Name */}
        <div className="flex items-center space-x-4 -ml-4">
          <Link href="/">
            <Image src="/logo.png" alt=" Logo" width={50} height={50} />
          </Link>
          <span className="text-3xl font-extrabold">Sifa Interior</span>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-6 relative">
          <li>
            <Link
              href="/"
              className="text-lg font-medium text-black-700 hover:text-blue-900"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              href="/about"
              className="text-lg font-medium text-black-700 hover:text-blue-900"
            >
              About
            </Link>
          </li>

          {/* Products Dropdown */}
          <li
            className="relative"
            onMouseEnter={() => handleMouseEnter(setIsProductsOpen)}
            onMouseLeave={() => handleMouseLeave(setIsProductsOpen)}
          >
            <button
              onClick={toggleProductsDropdown}
              className="text-lg font-medium text-black hover:text-blue-700 focus:outline-none"
            >
              Products
            </button>
            {isProductsOpen && (
              <ul className="absolute left-0 mt-2 bg-nude-light text-black shadow-lg rounded-lg p-2">
                <li className="p-2 hover:bg-nude-dark rounded-lg">
                  <Link href="/shop">Shop</Link>
                </li>
                <li className="p-2 hover:bg-nude-dark rounded-lg">
                  <Link href="/tiles">Tiles</Link>
                </li>
                
              </ul>
            )}
          </li>
          <li>
                  <Link
                    href="/contact"
                    className="text-lg font-medium text-black-700 hover:text-blue-900"
                  >
                    Contact
                  </Link>
                </li>
        </ul>

        {/* Hamburger Icon for Mobile */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        >
          {isDrawerOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isDrawerOpen && (
        <div className="md:hidden fixed top-0 right-0 h-full bg-nude z-40 flex flex-col items-start p-6 space-y-4 shadow-lg w-50 transition-transform transform">
          <button
            onClick={handleDrawerLinkClick}
            className="self-end text-lg font-medium text-black hover:text-blue-900 focus:outline-none mb-4"
          >
            ✖
          </button>

          <Link
            href="/"
            onClick={handleDrawerLinkClick}
            className="text-lg font-medium text-black hover:text-blue-900"
          >
            Home
          </Link>

          <Link
            href="/about"
            onClick={handleDrawerLinkClick}
            className="text-lg font-medium text-black hover:text-blue-900"
          >
            About
          </Link>

          {/* Products Links */}
          <div className="w-full">
            <button
              onClick={toggleProductsDropdown}
              className="w-full text-left text-lg font-medium text-black hover:text-blue-700 focus:outline-none"
            >
              Products
            </button>
            {isProductsOpen && (
              <ul className="mt-2 bg-nude-light text-black shadow-lg rounded-lg p-2">
                <li className="p-2 hover:bg-nude-dark rounded-lg">
                  <Link href="/shop" onClick={handleDrawerLinkClick}>
                    Shop
                  </Link>
                </li>
                <li className="p-2 hover:bg-nude-dark rounded-lg">
                  <Link href="/tiles" onClick={handleDrawerLinkClick}>
                    Tiles
                  </Link>
                </li>
              </ul>
            )}

            <Link
              href="/contact"
              onClick={handleDrawerLinkClick}
              className="text-lg font-medium text-black hover:text-blue-900"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
