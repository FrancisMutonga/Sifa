import React from "react";
import Nav from "./components/nav";
import Footer from "./components/footer";
import Head from "next/head";
import "./globals.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      {/* SEO Improvements in <head> */}
      <Head>
        <title>Sifa Interiors - Home</title>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
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
        
      </Head>
     
      <html lang="en">
        <body className="min-h-screen w-screen flex flex-col bg-gray-100">
        <div className="  ">
        <Nav />
          <main className="flex-grow">{children}</main>
          <Footer /> 
        </div>
         
        </body>
      </html>
    </>
  );
};

export default Layout;
