import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#111122] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-light tracking-wide mb-4">
              APEX<span className="text-[#c9a84c] font-semibold">HOMES</span>
            </h3>
            <p className="text-white/40 text-sm leading-relaxed">
              Crafting exceptional custom residences since 2008. Every home we
              build is a masterpiece.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-white/60 mb-5">
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Home", page: "Home" },
                { name: "About Us", page: "About" },
                { name: "Portfolio", page: "Portfolio" },
                { name: "Contact", page: "Contact" },
                { name: "Warranty", page: "Warranty" },
              ].map((link) => (
                <li key={link.page}>
                  <Link
                    to={createPageUrl(link.page)}
                    className="text-white/40 text-sm hover:text-[#c9a84c] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-white/60 mb-5">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#c9a84c] mt-0.5 flex-shrink-0" />
                <span className="text-white/40 text-sm">
                  1234 Builder's Lane
                  <br />
                  Scottsdale, AZ 85251
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#c9a84c] flex-shrink-0" />
                <span className="text-white/40 text-sm">(480) 555-0190</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#c9a84c] flex-shrink-0" />
                <span className="text-white/40 text-sm">
                  info@apexhomes.com
                </span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-white/60 mb-5">
              Office Hours
            </h4>
            <ul className="space-y-2 text-white/40 text-sm">
              <li className="flex justify-between">
                <span>Mon – Fri</span>
                <span>8am – 6pm</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span>9am – 4pm</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span>By Appt.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/25 text-xs">
            © {new Date().getFullYear()} Apex Homes. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/25 text-xs hover:text-white/50 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-white/25 text-xs hover:text-white/50 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}