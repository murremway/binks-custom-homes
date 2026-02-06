import React from "react";
import { motion } from "framer-motion";
import { PenTool, Building2, Hammer, ShieldCheck } from "lucide-react";

const services = [
  {
    icon: PenTool,
    title: "Custom Home Design",
    description:
      "Collaborate with our talented architects and designers to create a home that is uniquely yours. We take the time to understand your lifestyle, preferences, and vision to design a space that truly reflects who you are.",
  },
  {
    icon: Building2,
    title: "New Home Construction",
    description:
      "Using the highest quality materials and the latest building techniques, we construct homes that are built to last. From foundation to finish, every detail is executed with precision and care.",
  },
  {
    icon: Hammer,
    title: "Remodeling and Renovations",
    description:
      "Transform your existing home with our expert remodeling services, tailored to enhance its beauty and functionality. Whether it's a kitchen upgrade, bathroom remodel, or full home renovation, we bring your vision to life.",
  },
  {
    icon: ShieldCheck,
    title: "Project Management",
    description:
      "Our experienced project managers oversee every aspect of the construction process, ensuring timely and on-budget completion. We handle the complexities so you can enjoy peace of mind throughout your project.",
  },
];

export default function Services() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80"
            alt="Our Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#1a1a2e]/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-[#c9a84c]" />
              <span className="text-[#c9a84c] tracking-[0.3em] uppercase text-xs font-medium">
                What We Do
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-light text-white">
              Our <span className="italic font-semibold text-[#c9a84c]">Services</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-light text-[#1a1a2e] mb-4">
              Comprehensive Home Building{" "}
              <span className="italic font-semibold">Solutions</span>
            </h2>
            <p className="text-[#1a1a2e]/60 leading-relaxed">
              From initial design to final construction, we provide a full range of services to bring your dream home to life. Our team of experts is dedicated to delivering exceptional quality at every stage.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="bg-white p-8 md:p-10 hover:shadow-xl transition-all duration-500 group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 border border-[#c9a84c]/30 mb-6 group-hover:bg-[#c9a84c] group-hover:border-[#c9a84c] transition-all duration-500">
                  <service.icon className="w-7 h-7 text-[#c9a84c] group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="text-2xl font-medium text-[#1a1a2e] mb-4">
                  {service.title}
                </h3>
                <p className="text-[#1a1a2e]/60 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-12 bg-[#c9a84c]" />
                <span className="text-[#c9a84c] tracking-[0.3em] uppercase text-xs font-medium">
                  Why Choose Us
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-[#1a1a2e] mb-6">
                Excellence in Every{" "}
                <span className="italic font-semibold">Detail</span>
              </h2>
              <div className="space-y-4 text-[#1a1a2e]/60 leading-relaxed">
                <p>
                  <span className="font-medium text-[#1a1a2e]">Experienced Team:</span> Our team of architects, builders, and project managers brings years of experience and expertise to every project.
                </p>
                <p>
                  <span className="font-medium text-[#1a1a2e]">Customer-Centric Approach:</span> Your satisfaction is our top priority. We listen to your needs and work tirelessly to bring your vision to life.
                </p>
                <p>
                  <span className="font-medium text-[#1a1a2e]">Innovative Designs:</span> We stay ahead of industry trends, incorporating the latest design innovations and sustainable practices into our homes.
                </p>
                <p>
                  <span className="font-medium text-[#1a1a2e]">Transparent Process:</span> We believe in open communication and transparency, keeping you informed and involved throughout the entire building process.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80"
                alt="Quality craftsmanship"
                className="w-full aspect-[4/5] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}