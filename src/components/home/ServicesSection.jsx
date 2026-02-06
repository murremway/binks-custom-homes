import React from "react";
import { motion } from "framer-motion";
import { PenTool, Building2, Hammer, ShieldCheck } from "lucide-react";

const services = [
  {
    icon: PenTool,
    title: "Custom Design",
    description:
      "Collaborate with our architects to create a home that reflects your unique vision and lifestyle.",
  },
  {
    icon: Building2,
    title: "New Construction",
    description:
      "From foundation to finish, we build with premium materials and masterful craftsmanship.",
  },
  {
    icon: Hammer,
    title: "Renovations",
    description:
      "Transform your existing home with thoughtful renovations that enhance beauty and functionality.",
  },
  {
    icon: ShieldCheck,
    title: "Warranty Service",
    description:
      "Our commitment to you extends beyond move-in with comprehensive warranty coverage.",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-[#c9a84c]" />
            <span className="text-[#c9a84c] tracking-[0.3em] uppercase text-xs font-medium">
              What We Do
            </span>
            <div className="h-px w-12 bg-[#c9a84c]" />
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-[#1a1a2e]">
            Our <span className="italic font-semibold">Services</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group text-center p-8 hover:bg-[#faf8f5] transition-colors duration-500 rounded-sm"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 border border-[#c9a84c]/30 mb-6 group-hover:bg-[#c9a84c] group-hover:border-[#c9a84c] transition-all duration-500">
                <service.icon className="w-6 h-6 text-[#c9a84c] group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="text-lg font-medium text-[#1a1a2e] mb-3">
                {service.title}
              </h3>
              <p className="text-[#1a1a2e]/50 text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}