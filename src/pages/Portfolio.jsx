import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";

const categories = ["All", "Modern", "Traditional", "Mediterranean", "Contemporary"];

const projects = [
  {
    title: "Modern Ranch Home - Exterior",
    location: "Harrisburg, PA",
    sqft: "2,400",
    category: "Modern",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6985c39bfc9bae193ed170ac/0552ebf68_Screenshot2026-02-06054609.png",
  },
  {
    title: "Contemporary Farmhouse",
    location: "Harrisburg, PA",
    sqft: "2,600",
    category: "Contemporary",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6985c39bfc9bae193ed170ac/ddb296cba_Screenshot2026-02-06054620.png",
  },
  {
    title: "Grand Entryway",
    location: "Harrisburg, PA",
    sqft: "2,400",
    category: "Modern",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6985c39bfc9bae193ed170ac/ee8f0ae8d_Screenshot2026-02-06054639.png",
  },
  {
    title: "Open Concept Living",
    location: "Harrisburg, PA",
    sqft: "2,600",
    category: "Contemporary",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6985c39bfc9bae193ed170ac/65765b96d_Screenshot2026-02-06054651.png",
  },
  {
    title: "Gourmet Kitchen",
    location: "Harrisburg, PA",
    sqft: "2,400",
    category: "Modern",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6985c39bfc9bae193ed170ac/f5271ca24_Screenshot2026-02-06054709.png",
  },
  {
    title: "Chef's Kitchen",
    location: "Harrisburg, PA",
    sqft: "2,600",
    category: "Contemporary",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6985c39bfc9bae193ed170ac/440a5196a_Screenshot2026-02-06054724.png",
  },
  {
    title: "Living Space with Fireplace",
    location: "Harrisburg, PA",
    sqft: "2,400",
    category: "Modern",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6985c39bfc9bae193ed170ac/2e88dc1da_Screenshot2026-02-06055628.png",
  },
  {
    title: "Luxury Master Bath",
    location: "Harrisburg, PA",
    sqft: "2,600",
    category: "Contemporary",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6985c39bfc9bae193ed170ac/76e35ab12_Screenshot2026-02-06055701.png",
  },
  {
    title: "Custom Family Home",
    location: "Harrisburg, PA",
    sqft: "2,800",
    category: "Modern",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6985c39bfc9bae193ed170ac/37834a286_Screenshot2026-02-06055811.png",
  },
];

export default function Portfolio() {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80"
            alt="Portfolio"
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
                Our Work
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-light text-white">
              Project <span className="italic font-semibold text-[#c9a84c]">Portfolio</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-20 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2.5 text-xs tracking-wider uppercase font-medium transition-all duration-300 ${
                  active === cat
                    ? "bg-[#1a1a2e] text-white"
                    : "bg-white text-[#1a1a2e]/60 hover:bg-[#1a1a2e]/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="group cursor-pointer bg-white"
                >
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-between p-6">
                      <div>
                        <p className="text-white font-medium">{project.title}</p>
                        <p className="text-white/60 text-sm flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3" /> {project.location}
                        </p>
                      </div>
                      <div className="bg-white/90 p-2.5 rounded-full">
                        <ArrowUpRight className="w-4 h-4 text-[#1a1a2e]" />
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-medium text-[#1a1a2e] mb-1">
                      {project.title}
                    </h3>
                    <p className="text-[#1a1a2e]/40 text-sm">
                      {project.location} · {project.sqft} sq ft
                    </p>
                    <span className="inline-block mt-3 text-[10px] tracking-widest uppercase text-[#c9a84c] font-medium border border-[#c9a84c]/30 px-3 py-1">
                      {project.category}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
}