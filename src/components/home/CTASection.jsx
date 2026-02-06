import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";

export default function CTASection() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&q=80"
          alt="Luxury home interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#1a1a2e]/80" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-5xl font-light text-white mb-6">
            Ready to Build Your{" "}
            <span className="italic font-semibold text-[#c9a84c]">
              Dream Home?
            </span>
          </h2>
          <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
            Let's start a conversation about bringing your vision to life.
            Schedule a consultation with our design team today.
          </p>
          <Link
            to={createPageUrl("Contact")}
            className="group inline-flex items-center gap-3 bg-[#c9a84c] text-[#1a1a2e] px-10 py-4 text-sm tracking-wider uppercase font-medium hover:bg-[#d4b65c] transition-all duration-300"
          >
            Start Your Project
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}