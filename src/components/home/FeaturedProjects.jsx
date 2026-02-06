import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";

const projects = [
  {
    title: "Modern Ranch Home",
    location: "Harrisburg, PA",
    sqft: "2,400",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6985c39bfc9bae193ed170ac/0552ebf68_Screenshot2026-02-06054609.png",
  },
  {
    title: "Contemporary Farmhouse",
    location: "Harrisburg, PA",
    sqft: "2,600",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6985c39bfc9bae193ed170ac/ddb296cba_Screenshot2026-02-06054620.png",
  },
  {
    title: "Custom Family Home",
    location: "Harrisburg, PA",
    sqft: "2,800",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6985c39bfc9bae193ed170ac/37834a286_Screenshot2026-02-06055811.png",
  },
];

export default function FeaturedProjects() {
  return (
    <section className="py-24 md:py-32 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-[#c9a84c]" />
              <span className="text-[#c9a84c] tracking-[0.3em] uppercase text-xs font-medium">
                Portfolio
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-light text-[#1a1a2e]">
              Featured <span className="italic font-semibold">Projects</span>
            </h2>
          </div>
          <Link
            to={createPageUrl("Portfolio")}
            className="mt-6 md:mt-0 text-[#1a1a2e] text-sm tracking-wider uppercase font-medium hover:text-[#c9a84c] transition-colors flex items-center gap-2"
          >
            View All Projects
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden aspect-[3/4] mb-5">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <ArrowUpRight className="w-5 h-5 text-[#1a1a2e]" />
                </div>
              </div>
              <h3 className="text-xl font-medium text-[#1a1a2e] mb-1">
                {project.title}
              </h3>
              <p className="text-[#1a1a2e]/50 text-sm">
                {project.location} · {project.sqft} sq ft
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}