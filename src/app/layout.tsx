"use client";
import React from "react";
import Nav from "./components/nav";
import Footer from "./components/footer";
import Head from "next/head";
import { usePathname } from "next/navigation";
import "./globals.css";

interface LayoutProps {
  children: React.ReactNode;
}


const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();
// Only show the WhatsApp CTA on client-side pages (not admin dashboard)
  const isClientSide = !pathname.startsWith("/admin");
  return (
    <>
      {/* Metadata for SEO and Favicon */}
      <Head>
        {/* SEO Metadata */}
        <title>Sifa Interiors </title>
        
        <meta
          name="description"
          content="Welcome to Sifa Interiors. Discover premium quality furniture, tiles, and more for your home."
        />
        <meta
          name="keywords"
          content="Sifa Interiors, furniture, tiles, home decor, interior design"
        />
        <meta name="author" content="Sifa Interiors" />
        <meta property="og:title" content="Sifa Interiors - Home" />
        <meta
          property="og:description"
          content="Welcome to Sifa Interiors. Discover premium quality furniture, tiles, and more for your home."
        />
        <meta property="og:image" content="/path-to-image.jpg" />
        <meta property="og:url" content="https://www.sifainteriors.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sifa Interiors - Home" />
        <meta
          name="twitter:description"
          content="Welcome to Sifa Interiors. Discover premium quality furniture, tiles, and more for your home."
        />
        <meta name="twitter:image" content="/path-to-image.jpg" />

        {/* Favicon Links */}
        <link rel="icon" href="/logo.png" sizes="any" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      {/* Main Layout Structure */}
      <html lang="en">
        <body className="min-h-screen w-screen flex flex-col bg-nude">
          <div>
            <Nav />
            <main className="flex-grow">{children}</main>
            <Footer />
             {/* Fixed WhatsApp CTA */}
          {isClientSide && (
            <a
              href="https://wa.me/254702055158"

              target="_blank"
              rel="noopener noreferrer"
              className="fixed bottom-12 right-12  bg-white\30 text-green flex items-center gap-2 px-4 py-2 rounded-full shadow-lg hover:bg-green-600 transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="w-12 h-12 "
                viewBox="0 0 24 24"
              >
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.552 4.116 1.517 5.856L.05 24l6.281-1.63A11.96 11.96 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm.005 22.003c-1.935 0-3.814-.503-5.49-1.451l-.393-.23-3.719.966.99-3.625-.255-.372A9.977 9.977 0 012.005 12c0-5.523 4.478-10.002 10-10.002 5.523 0 10.002 4.479 10.002 10.002s-4.479 10.003-10.002 10.003zm5.565-6.814c-.315-.157-1.866-.92-2.154-1.027-.288-.106-.497-.158-.706.158-.209.315-.814 1.027-.998 1.236-.183.21-.366.236-.682.079-.315-.157-1.334-.492-2.544-1.567-.94-.837-1.575-1.87-1.762-2.185-.183-.315-.02-.485.138-.642.143-.143.315-.367.472-.549.157-.183.209-.315.315-.524.105-.21.052-.394-.026-.55-.08-.157-.705-1.69-.966-2.317-.252-.604-.508-.52-.706-.53-.183-.009-.394-.011-.605-.011s-.55.079-.837.394c-.288.315-1.095 1.071-1.095 2.607 0 1.535 1.12 3.02 1.276 3.23.157.21 2.2 3.364 5.35 4.718.749.323 1.333.517 1.788.661.75.239 1.432.206 1.972.124.601-.091 1.866-.76 2.131-1.496.262-.733.262-1.36.183-1.497-.08-.136-.283-.21-.597-.367z" fill="#25D366"/>
               
              </svg>
             
            </a>
          )}
          </div>
        </body>
      </html>
    </>
  );
};

export default Layout;
