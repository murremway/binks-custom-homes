import React from "react";
import HeroSection from "../components/home/HeroSection";
import StatsBar from "../components/home/StatsBar";
import FeaturedProjects from "../components/home/FeaturedProjects";
import TestimonialsSection from "../components/home/TestimonialsSection";
import CTASection from "../components/home/CTASection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <StatsBar />
      <FeaturedProjects />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}