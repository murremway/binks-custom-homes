import React from "react";
import { motion } from "framer-motion";
import { Award, Users, Target, Heart } from "lucide-react";

const values = [
  {
    icon: Award,
    title: "Uncompromising Quality",
    description: "We use only premium materials and work with the finest craftsmen to deliver a home that stands the test of time.",
  },
  {
    icon: Users,
    title: "Client-Centered",
    description: "Your vision drives every decision. We listen, collaborate, and deliver beyond expectations.",
  },
  {
    icon: Target,
    title: "Precision & Detail",
    description: "From structural integrity to the smallest finishing touches, nothing escapes our meticulous eye.",
  },
  {
    icon: Heart,
    title: "Passion for Craft",
    description: "Building homes isn't just our business—it's our calling. Every project ignites our passion anew.",
  },
];

const team = [
  {
    name: "James Whitfield",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  },
  {
    name: "Elena Vasquez",
    role: "Chief Architect",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
  },
  {
    name: "Marcus Chen",
    role: "Construction Director",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
  },
  {
    name: "Sarah Mitchell",
    role: "Interior Design Lead",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
  },
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1920&q=80"
            alt="About Apex Homes"
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
                Our Story
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-light text-white">
              About <span className="italic font-semibold text-[#c9a84c]">Us</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-light text-[#1a1a2e] mb-6">
                Eighteen Years of Building{" "}
                <span className="italic font-semibold">Excellence</span>
              </h2>
              <div className="space-y-4 text-[#1a1a2e]/60 leading-relaxed">
                <p>
                  Founded in 2008 by James Whitfield, Binks Homes began with a
                  simple belief: everyone deserves a home that inspires them. What
                  started as a two-person operation has grown into one of the
                  region's most respected custom home builders.
                </p>
                <p>
                  We've built over 250 custom residences, each one a unique
                  reflection of its owner's lifestyle and aspirations. Our
                  integrated approach—combining architecture, construction, and
                  interior design—ensures a seamless experience from concept to
                  completion.
                </p>
                <p>
                  Today, our team of 60+ professionals continues to push the
                  boundaries of residential design, creating homes that are as
                  sustainable as they are stunning.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80"
                alt="Building process"
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#c9a84c] p-6 md:p-8">
                <p className="text-3xl md:text-4xl font-light text-[#1a1a2e]">18+</p>
                <p className="text-[#1a1a2e]/70 text-sm uppercase tracking-wider">
                  Years of Excellence
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-[#c9a84c]" />
              <span className="text-[#c9a84c] tracking-[0.3em] uppercase text-xs font-medium">
                Our Values
              </span>
              <div className="h-px w-12 bg-[#c9a84c]" />
            </div>
            <h2 className="text-3xl md:text-5xl font-light text-[#1a1a2e]">
              What <span className="italic font-semibold">Drives Us</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 hover:shadow-xl transition-shadow duration-500"
              >
                <value.icon className="w-8 h-8 text-[#c9a84c] mb-5" />
                <h3 className="text-lg font-medium text-[#1a1a2e] mb-3">
                  {value.title}
                </h3>
                <p className="text-[#1a1a2e]/50 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-[#c9a84c]" />
              <span className="text-[#c9a84c] tracking-[0.3em] uppercase text-xs font-medium">
                Leadership
              </span>
              <div className="h-px w-12 bg-[#c9a84c]" />
            </div>
            <h2 className="text-3xl md:text-5xl font-light text-[#1a1a2e]">
              Meet Our <span className="italic font-semibold">Team</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="relative overflow-hidden aspect-[3/4] mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <h3 className="font-medium text-[#1a1a2e]">{member.name}</h3>
                <p className="text-[#1a1a2e]/40 text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}