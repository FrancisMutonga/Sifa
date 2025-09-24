"use client";

import { useState, useEffect } from "react";
import {
  FaHome,
  FaSignOutAlt,
  FaBars,
 } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { FaBasketShopping, FaComment, FaNewspaper, FaThumbsUp } from "react-icons/fa6";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  link: string;
  isOpen: boolean;
  onClick?: () => void;
}

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSidebarLinkClick = () => setIsSidebarOpen(false);

  if (isMobile) {
    // For mobile, use overlay
    return (
      <>
        {/* Mobile top nav */}
        <div className="fixed top-0 left-0 right-0 z-50  bg-nude/80 shadow-md px-4 py-3 flex items-center justify-between">
          <div className="flex gap-4 items-center px-4 py-2">
            <Image src="/logo.png" alt="Logo" width={32} height={32} />
            <span className="text-forest text-2xl font-bold">
              Sifa Studios
            </span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-forest l"
          >
            <FaBars />
          </button>
        </div>

        {isSidebarOpen && (
          <div className="fixed top-0 left-0 h-full w-40 bg-nude mt-4 shadow-xl flex flex-col transition-all duration-300 z-40 rounded-r-xl overflow-hidden">
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-primary mb-6 text-right w-full"
            >
              ✕
            </button>
            <nav className="flex flex-col gap-4">
              <SidebarItem
                icon={<FaHome />}
                label="Home"
                link="/admin/dashboard"
                onClick={handleSidebarLinkClick}
                isOpen
              />
              <SidebarItem
                icon={<FaBasketShopping />}
                label="Products"
                link="/admin/products"
                onClick={handleSidebarLinkClick}
                isOpen
              />
              <SidebarItem
                icon={<FaNewspaper />}
                label="News"
                link="/admin/news"
                onClick={handleSidebarLinkClick}
                isOpen
              />
              <SidebarItem
                icon={<FaThumbsUp />}
                label="Bestsellers"
                link="/admin/bestsellers"
                onClick={handleSidebarLinkClick}
                isOpen
              />
              <SidebarItem
                icon={<FaComment />}
                label="Messages"
                link="/admin/messages"
                onClick={handleSidebarLinkClick}
                isOpen
              />
              <SidebarItem
                icon={<FaSignOutAlt />}
                label="Logout"
                link="/"
                isOpen
                onClick={handleSidebarLinkClick}
              />
              
            </nav>
          </div>
        )}
      </>
    );
  }

  // For desktop: part of flex flow
  return (
    <div
      className={clsx(
        "sticky top-0  h-screen bg-nude shadow-md transition-all duration-300 overflow-hidden rounded-r-xl",
        isOpen ? "w-64" : "w-20"
      )}
    >
      <div className="p-4 text-primary">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-forest flex items-center gap-3 mb-8 focus:outline-none"
        >
          <Image src="/logo.png" alt="Logo" width={32} height={32} />
          {isOpen && (
            <span className=" text-xl font-bold">Sifa Studios</span>
          )}
        </button>

        <nav className="flex flex-col gap-6 mt-4">
          <SidebarItem
            icon={<FaHome />}
            label="Home"
            link="/admin/dashboard"
            isOpen={isOpen}
          />
          <SidebarItem
            icon={<FaBasketShopping />}
            label="Products"
            link="/admin/products"
            isOpen={isOpen}
          />
          <SidebarItem
            icon={<FaNewspaper />}
            label="News"
            link="/admin/news"
            isOpen={isOpen}
          />
          <SidebarItem
            icon={<FaThumbsUp />}
            label="Bestsellers"
            link="/admin/bestsellers"
            isOpen={isOpen}
          />
          <SidebarItem
            icon={<FaComment />}
            label="Messages"
            link="/admin/messages"
            isOpen={isOpen}
          />
          <SidebarItem
            icon={<FaSignOutAlt />}
            label="Logout"
            link="/"
            isOpen={isOpen}
          />
          </nav>
      </div>
    </div>
  );
};

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  link,
  isOpen,
  onClick,
}) => {
  return (
    <Link
      href={link}
      onClick={onClick}
      className={clsx(
        "flex items-center text-forest p-3 rounded-lg hover:bg-white/20 transition-all duration-200",
        isOpen ? "gap-4 justify-start" : "justify-center"
      )}
    >
      {icon}
      {isOpen && <span className="text-sm">{label}</span>}
    </Link>
  );
};

export default Sidebar;
