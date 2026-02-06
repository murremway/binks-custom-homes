import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    text: "They took our wildest ideas and turned them into the most breathtaking home we could have ever imagined. Every detail was executed with precision and care.",
    author: "Michael & Sarah Thompson",
    role: "Homeowners, The Meridian Estate",
  },
  {
    text: "From the initial consultation to handing us the keys, the experience was seamless. The team's dedication to quality is unmatched in the industry.",
    author: "David Chen",
    role: "Homeowner, Cascade Villa",
  },
  {
    text: "Building a custom home felt daunting until we partnered with this team. Their transparency, expertise, and passion made it an absolute joy.",
    author: "Jennifer & Robert Mills",
    role: "Homeowners, Harborview Residence",
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () =>
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 md:py-32 bg-[#1a1a2e] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5">
        <Quote className="w-full h-full" />
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-12">
            <div className="h-px w-12 bg-[#c9a84c]" />
            <span className="text-[#c9a84c] tracking-[0.3em] uppercase text-xs font-medium">
              Testimonials
            </span>
            <div className="h-px w-12 bg-[#c9a84c]" />
          </div>

          <div className="min-h-[200px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed italic mb-8">
                  "{testimonials[current].text}"
                </p>
                <div>
                  <p className="text-[#c9a84c] font-medium">
                    {testimonials[current].author}
                  </p>
                  <p className="text-white/40 text-sm mt-1">
                    {testimonials[current].role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={prev}
              className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/50 hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current ? "bg-[#c9a84c] w-6" : "bg-white/20"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/50 hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}