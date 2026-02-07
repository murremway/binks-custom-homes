import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1597047084897-51e2df133900?w=1920&q=80"
          alt="Luxury custom home"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a2e]/90 via-[#1a1a2e]/60 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-[#c9a84c]" />
            <span className="text-[#c9a84c] tracking-[0.3em] uppercase text-xs font-medium">
              Custom Home Builders
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-[1.1] mb-6">
            Building Your
            <span className="block font-semibold italic text-[#c9a84c]">
              Dream Home
            </span>
          </h1>

          <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
            Crafting exceptional custom residences with uncompromising quality,
            timeless design, and meticulous attention to every detail.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to={createPageUrl("Portfolio")}
              className="group inline-flex items-center gap-3 bg-[#c9a84c] text-[#1a1a2e] px-8 py-4 text-sm tracking-wider uppercase font-medium hover:bg-[#d4b65c] transition-all duration-300"
            >
              View Our Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to={createPageUrl("Contact")}
              className="inline-flex items-center gap-3 border border-white/30 text-white px-8 py-4 text-sm tracking-wider uppercase font-medium hover:bg-white/10 transition-all duration-300"
            >
              Get In Touch
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="w-5 h-5 text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}