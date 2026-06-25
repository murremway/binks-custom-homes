import React from "react";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";

export default function Layout({ children, currentPageName }) {
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700&display=swap');
        * { font-family: 'Inter', sans-serif; }
        html { scroll-behavior: smooth; }
      `}</style>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
