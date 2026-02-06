import React from "react";
import HeroSection from "../components/home/HeroSection";
import StatsBar from "../components/home/StatsBar";
import ServicesSection from "../components/home/ServicesSection";
import FeaturedProjects from "../components/home/FeaturedProjects";
import TestimonialsSection from "../components/home/TestimonialsSection";
import CTASection from "../components/home/CTASection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <StatsBar />
      <ServicesSection />
      <FeaturedProjects />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}