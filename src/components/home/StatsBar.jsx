import React from "react";
import { motion } from "framer-motion";

const stats = [
  { number: "250+", label: "Homes Built" },
  { number: "18", label: "Years Experience" },
  { number: "98%", label: "Client Satisfaction" },
  { number: "15+", label: "Design Awards" },
];

export default function StatsBar() {
  return (
    <section className="bg-[#1a1a2e] py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-light text-[#c9a84c] mb-2">
                {stat.number}
              </div>
              <div className="text-white/50 text-sm tracking-wider uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}