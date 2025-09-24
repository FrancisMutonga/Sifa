"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Image from "next/image";

const Navbar: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerLinkClick = () => {
    setTimeout(() => {
      setIsDrawerOpen(false);
    }, 200);
  };

  return (
    <nav
      className=" fixed top-0 z-50 w-full flex text-forest p-4 px-12 shadow-[0_4px_4px_-2px_rgba(0,0,0,0.4)]"
      style={{ fontFamily: "SegoeUI" }}
    >
      <div className="container mx-auto flex justify-between  items-center">
        {/* Logo and Name */}
        <div className="flex items-center space-x-4 -ml-4">
          <Link href="/auth/login">
            <Image src="/logo.png" alt="Logo" width={50} height={50} />
          </Link>
          <span className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl text-forest font-semibold">Sifa Studios</span>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-6 mr-20">
          <li>
            <Link
              href="/"
              className="text-lg font-medium text-forest hover:text-blue-900"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              href="/shop"
              className="text-lg font-medium text-forest hover:text-blue-900"
            >
              Shop
            </Link>
          </li>

          <li>
            <Link
              href="/contact"
              className="text-lg font-medium text-forest hover:text-blue-900"
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Hamburger Icon for Mobile */}
        <button
          className="md:hidden text-2xl text-forest"
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        >
          {isDrawerOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isDrawerOpen && (
        <div className="md:hidden fixed top-0 right-0 h-full bg-nude z-40 flex flex-col items-start p-6 space-y-4 shadow-lg w-1/3 transition-transform transform">
          <button
            onClick={handleDrawerLinkClick}
            className="self-end text-lg font-medium text-black hover:text-blue-900 mb-4"
          >
            ✖
          </button>

          <Link
            href="/"
            onClick={handleDrawerLinkClick}
            className="text-lg font-medium text-forest hover:text-blue-900"
          >
            Home
          </Link>

          <Link
            href="/shop"
            onClick={handleDrawerLinkClick}
            className="text-lg font-medium text-forest hover:text-blue-900"
          >
            Shop
          </Link>

          <Link
            href="/contact"
            onClick={handleDrawerLinkClick}
            className="text-lg font-medium text-forest hover:text-blue-900"
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
