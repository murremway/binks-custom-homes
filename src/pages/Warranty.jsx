import React from "react";
import { motion } from "framer-motion";
import { FileCheck, Clock, Wrench } from "lucide-react";
import WarrantyClaimForm from "@/components/forms/WarrantyClaimForm";

const processSteps = [
  {
    icon: FileCheck,
    title: "Submit Claim",
    description: "Fill out the warranty claim form with details about your issue.",
  },
  {
    icon: Clock,
    title: "Review",
    description: "Our team reviews your claim within 1-2 business days.",
  },
  {
    icon: Wrench,
    title: "Resolution",
    description: "We schedule and complete the necessary repairs promptly.",
  },
];

export default function Warranty() {
  return (
    <div>
      <section className="relative h-[50vh] min-h-[350px] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80"
            alt="Warranty"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#1a1a2e]/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-[#c9a84c]" />
              <span className="text-[#c9a84c] tracking-[0.3em] uppercase text-xs font-medium">
                Homeowner Support
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-light text-white">
              Warranty <span className="italic font-semibold text-[#c9a84c]">Claims</span>
            </h1>
            <p className="text-white/60 mt-4 max-w-lg text-lg">
              We stand behind every home we build. Submit a warranty claim and
              we'll take care of the rest.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white border-b border-[#1a1a2e]/5">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-3 gap-8">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-[#c9a84c]/10 flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-5 h-5 text-[#c9a84c]" />
                  </div>
                  {i < processSteps.length - 1 && (
                    <div className="w-px h-full bg-[#c9a84c]/20 my-2 hidden md:block" />
                  )}
                </div>
                <div>
                  <div className="text-[10px] tracking-widest uppercase text-[#c9a84c] mb-1 font-medium">
                    Step {i + 1}
                  </div>
                  <h3 className="font-medium text-[#1a1a2e] mb-1">{step.title}</h3>
                  <p className="text-[#1a1a2e]/50 text-sm">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#faf8f5]">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-10 shadow-sm"
          >
            <WarrantyClaimForm />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
