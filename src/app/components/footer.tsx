import React from "react";
import Image from "next/image";
import "boxicons/css/boxicons.min.css";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-nude text-white p-6 mt-1">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        {/* Contact Us Section */}
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <h3 className="text-xl font-bold mb-3">Contact Us</h3>
          <ul className="space-y-2">
            <li className="text-sm">
              <span className="font-semibold">Location:</span>Road A, off Likoni road next to kenwest cables
            </li>
            <li className="text-sm">
              <span className="font-semibold">Phone:</span> 0702055158
            </li>
            <li className="text-sm">
              <span className="font-semibold">Email:</span>{" "}
              sifainteriors20@gmail.com
            </li>
          </ul>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-1">
            <li>
              <Link
                href="/"
                className="text-white text-sm hover:text-forest transition-colors"
              >
                Home
              </Link>
            </li>
            
            <li>
              <Link
                href="/shop"
                className="text-white text-sm hover:text-forest transition-colors"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-white text-sm hover:text-forest transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Us Section */}
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <h3 className="text-xl font-bold mb-3">Product Category</h3>
          <ul className="space-y-2">
            <li className="text-sm">
              <span className="font-semibold">Tiles</span>
            </li>
            <li className="text-sm">
              <span className="font-semibold">Home Furniture</span>
            </li>
            <li className="text-sm">
              <span className="font-semibold">Toilets</span>
            </li>
            <li className="text-sm">
              <span className="font-semibold">Basins</span>
            </li>
            <li className="text-sm">
              <span className="font-semibold">Lightings</span>
            </li>
            <li className="text-sm">
              <span className="font-semibold">Granite Tops</span>
            </li>
          </ul>
        </div>
        {/* Find Us Section */}
        <div className="w-full md:w-1/3">
          <h3 className="text-xl font-bold mb-3">Find Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/people/sifainteriors/61573172223176/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/facebook-logo.png"
                alt="Facebook"
                width={24}
                height={24}
              />
            </a>
            <a
              href="https://x.com/sifainteriors20"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/twitter-logo.png"
                alt="Twitter"
                width={24}
                height={24}
              />
            </a>
            <a
              href="https://www.instagram.com/_sifainteriors/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/instagram-logo.png"
                alt="Instagram"
                width={24}
                height={24}
              />
            </a>
            <a
              href="https://wa.me/254702055158"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/whatsapp-logo.png"
                alt="WhatsApp"
                width={24}
                height={24}
              />
            </a>
          </div>
        </div>
      </div>

      {/* Separator Line and Copyright Notice */}
      <div className="border-t border-white mt-6 pt-4">
        <div className="container mx-auto text-left">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Sifa Interiors Limited. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
