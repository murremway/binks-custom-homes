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
                Building Homes That Stand{" "}
                <span className="italic font-semibold">The Test of Time</span>
              </h2>
              <div className="space-y-4 text-[#1a1a2e]/60 leading-relaxed">
                <p>
                  Founded on the principles of quality, integrity, and dedication, Binks Homes LLC has established itself as a trusted name in the custom home building industry. Our journey began with a passion for building homes that stand the test of time, offering both beauty and functionality. Over the years, we have grown into a team of skilled professionals committed to turning your dream home into a tangible masterpiece.
                </p>
                <p>
                  Quality is at the heart of everything we do. We believe that a home is more than just a structure; it's a sanctuary where memories are made. That's why we are dedicated to providing superior craftsmanship, attention to detail, and personalized service. Our commitment to excellence has earned us a reputation for building homes that are as enduring as they are beautiful.
                </p>
              </div>
              
              <div className="mt-8 pt-8 border-t border-[#1a1a2e]/10">
                <h3 className="text-xl font-medium text-[#1a1a2e] mb-4">What We Do</h3>
                <ul className="space-y-3 text-[#1a1a2e]/60">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-[#c9a84c] rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-[#1a1a2e]">Custom Home Design:</span> Collaborate with our talented architects and designers to create a home that is uniquely yours.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-[#c9a84c] rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-[#1a1a2e]">New Home Construction:</span> Using the highest quality materials and the latest building techniques, we construct homes that are built to last.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-[#c9a84c] rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-[#1a1a2e]">Remodeling and Renovations:</span> Transform your existing home with our expert remodeling services, tailored to enhance its beauty and functionality.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-[#c9a84c] rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-[#1a1a2e]">Project Management:</span> Our experienced project managers oversee every aspect of the construction process, ensuring timely and on-budget completion.
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="mt-8 pt-8 border-t border-[#1a1a2e]/10">
                <h3 className="text-xl font-medium text-[#1a1a2e] mb-4">Why Choose Binks Homes LLC?</h3>
                <ul className="space-y-3 text-[#1a1a2e]/60">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-[#c9a84c] rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-[#1a1a2e]">Experienced Team:</span> Our team of architects, builders, and project managers brings years of experience and expertise to every project.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-[#c9a84c] rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-[#1a1a2e]">Customer-Centric Approach:</span> Your satisfaction is our top priority. We listen to your needs and work tirelessly to bring your vision to life.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-[#c9a84c] rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-[#1a1a2e]">Innovative Designs:</span> We stay ahead of industry trends, incorporating the latest design innovations and sustainable practices into our homes.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-[#c9a84c] rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-[#1a1a2e]">Transparent Process:</span> We believe in open communication and transparency, keeping you informed and involved throughout the entire building process.
                    </div>
                  </li>
                </ul>
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