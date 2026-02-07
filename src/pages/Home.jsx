import React from "react";
import HeroSection from "../components/home/HeroSection";
import FeaturedProjects from "../components/home/FeaturedProjects";
import TestimonialsSection from "../components/home/TestimonialsSection";
import CTASection from "../components/home/CTASection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedProjects />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}