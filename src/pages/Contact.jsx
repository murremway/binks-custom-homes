import React from "react";
import { motion } from "framer-motion";
import { Phone, Mail, Clock } from "lucide-react";
import ContactForm from "@/components/forms/ContactForm";

export default function Contact() {
  return (
    <div>
      <section className="relative h-[50vh] min-h-[350px] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=1920&q=80"
            alt="Contact"
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
                Get In Touch
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-light text-white">
              Contact <span className="italic font-semibold text-[#c9a84c]">Us</span>
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-5 gap-16">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-light text-[#1a1a2e] mb-8">
                  Let's Start a{" "}
                  <span className="italic font-semibold">Conversation</span>
                </h2>

                <div className="space-y-6">
                  {[
                    {
                      icon: Phone,
                      title: "Call Us",
                      lines: ["(223) 259-9834"],
                    },
                    {
                      icon: Mail,
                      title: "Email Us",
                      lines: ["admin@binkshomes.org"],
                    },
                    {
                      icon: Clock,
                      title: "Office Hours",
                      lines: ["Mon–Fri: 8am – 4pm"],
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-4">
                      <div className="w-10 h-10 bg-[#c9a84c]/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-4 h-4 text-[#c9a84c]" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-[#1a1a2e] mb-1">
                          {item.title}
                        </h3>
                        {item.lines.map((line) => (
                          <p key={line} className="text-[#1a1a2e]/50 text-sm">
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white p-8 md:p-10 shadow-sm"
              >
                <ContactForm />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
