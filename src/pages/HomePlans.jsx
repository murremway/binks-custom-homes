import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bed,
  Bath,
  Layers,
  Maximize2,
  ArrowUpRight,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { createPageUrl } from "../utils";
import { ridgeviewFloorPlan, ridgeviewPhotos } from "../data/ridgeviewPhotos";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const homePlans = [
  {
    name: "The Ridgeview",
    category: "Ranch",
    sqft: "2,135",
    beds: 3,
    baths: 2.5,
    stories: 1,
    description:
      "A single-story ranch with an open great room, kitchen island, covered rear deck, owner's suite, home office, and attached two-car garage.",
    image: ridgeviewPhotos[0].src,
    images: ridgeviewPhotos,
    floorPlan: ridgeviewFloorPlan,
  },
];

export default function HomePlans() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [modalView, setModalView] = useState("image-0");

  const openPlanDetails = (plan) => {
    if (plan.floorPlan || plan.images?.length) {
      setModalView("image-0");
      setSelectedPlan(plan);
    }
  };

  const getPlanPhotos = (plan) =>
    (plan.images ?? [{ label: "Exterior", src: plan.image }]).map((item, index) => ({
      id: `image-${index}`,
      label: item.label,
      src: item.src,
      alt: `${plan.name} ${item.label.toLowerCase()}`,
    }));

  const planPhotos = selectedPlan ? getPlanPhotos(selectedPlan) : [];
  const activePhoto =
    planPhotos.find((photo) => photo.id === modalView) ?? planPhotos[0] ?? null;
  const currentPhotoIndex = planPhotos.findIndex((photo) => photo.id === modalView);
  const hasMultiplePhotos = planPhotos.length > 1;

  const goToPhoto = useCallback(
    (direction) => {
      if (!planPhotos.length) return;
      const index = currentPhotoIndex >= 0 ? currentPhotoIndex : 0;
      const nextIndex =
        direction === "next"
          ? (index + 1) % planPhotos.length
          : (index - 1 + planPhotos.length) % planPhotos.length;
      setModalView(planPhotos[nextIndex].id);
    },
    [currentPhotoIndex, planPhotos],
  );

  useEffect(() => {
    if (!selectedPlan || !hasMultiplePhotos) return;

    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToPhoto("prev");
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goToPhoto("next");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPlan, hasMultiplePhotos, goToPhoto]);

  return (
    <div>
      <section className="relative h-[50vh] min-h-[350px] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80"
            alt="Home Plans"
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
                New Construction
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-light text-white">
              Home <span className="italic font-semibold text-[#c9a84c]">Plans</span>
            </h1>
            <p className="text-white/60 mt-4 max-w-xl text-lg leading-relaxed">
              Explore our collection of thoughtfully designed floor plans for new
              custom homes. Every plan can be tailored to fit your lot and lifestyle.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-[#faf8f5]">
        <div className="max-w-xl mx-auto px-6 md:px-12">
          <motion.div layout className="grid gap-6">
            <AnimatePresence mode="popLayout">
              {homePlans.map((plan) => (
                <motion.article
                  key={plan.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="group bg-white"
                >
                  <button
                    type="button"
                    onClick={() => openPlanDetails(plan)}
                    disabled={!plan.floorPlan && !plan.images?.length}
                    className={`relative overflow-hidden aspect-[4/3] w-full block text-left ${
                      plan.floorPlan || plan.images?.length
                        ? "cursor-pointer"
                        : "cursor-default"
                    }`}
                    aria-label={
                      plan.floorPlan || plan.images?.length
                        ? `View ${plan.name} details`
                        : `${plan.name} exterior`
                    }
                  >
                    <img
                      src={plan.image}
                      alt={`${plan.name} exterior`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-between p-6">
                      <div>
                        <p className="text-white font-medium">{plan.name}</p>
                        {(plan.floorPlan || plan.images?.length > 1) && (
                          <p className="text-white/70 text-xs mt-1 flex items-center gap-1.5">
                            <LayoutGrid className="w-3.5 h-3.5" />
                            View Details
                          </p>
                        )}
                      </div>
                      <div className="bg-white/90 p-2.5 rounded-full">
                        <ArrowUpRight className="w-4 h-4 text-[#1a1a2e]" />
                      </div>
                    </div>
                  </button>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="font-medium text-[#1a1a2e] text-lg">
                        {plan.name}
                      </h3>
                      <span className="inline-block shrink-0 text-[10px] tracking-widest uppercase text-[#c9a84c] font-medium border border-[#c9a84c]/30 px-3 py-1">
                        {plan.category}
                      </span>
                    </div>
                    <p className="text-[#1a1a2e]/60 text-sm leading-relaxed mb-4">
                      {plan.description}
                    </p>
                    <div className="flex flex-wrap gap-4 text-[#1a1a2e]/50 text-sm">
                      <span className="flex items-center gap-1.5">
                        <Maximize2 className="w-3.5 h-3.5 text-[#c9a84c]" />
                        {plan.sqft} sq ft
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Bed className="w-3.5 h-3.5 text-[#c9a84c]" />
                        {plan.beds} bed
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Bath className="w-3.5 h-3.5 text-[#c9a84c]" />
                        {plan.baths} bath{plan.baths === 1 ? "" : "s"}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-[#c9a84c]" />
                        {plan.stories} story
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <Dialog
        open={!!selectedPlan}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedPlan(null);
            setModalView("image-0");
          }
        }}
      >
        <DialogContent className="w-[calc(100vw-1rem)] max-w-6xl max-h-[90vh] overflow-x-hidden overflow-y-auto p-0 gap-0 border-0">
          {selectedPlan && activePhoto && (
            <>
              <DialogHeader className="p-4 sm:p-6 pb-4 border-b border-[#1a1a2e]/10">
                <DialogTitle className="text-2xl font-light text-[#1a1a2e]">
                  {selectedPlan.name}
                </DialogTitle>
                <DialogDescription className="flex flex-wrap gap-4 text-[#1a1a2e]/60 pt-2">
                  <span>{selectedPlan.sqft} sq ft</span>
                  <span>{selectedPlan.beds} bed</span>
                  <span>
                    {selectedPlan.baths} bath{selectedPlan.baths === 1 ? "" : "s"}
                  </span>
                  <span>{selectedPlan.stories} story</span>
                </DialogDescription>
              </DialogHeader>

              <section className="border-b border-[#1a1a2e]/10">
                <div className="px-6 pt-5 pb-2">
                  <h3 className="text-xs tracking-[0.25em] uppercase text-[#1a1a2e]/50 font-medium">
                    Photo Gallery
                  </h3>
                </div>

                <div className="px-4 sm:px-6 pb-4 overflow-hidden">
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <p className="text-sm text-[#1a1a2e]/70">{activePhoto.label}</p>
                    {hasMultiplePhotos && (
                      <p className="text-[10px] tracking-widest uppercase text-[#1a1a2e]/40">
                        {currentPhotoIndex + 1} / {planPhotos.length}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {planPhotos.map((photo) => (
                      <button
                        key={photo.id}
                        type="button"
                        onClick={() => setModalView(photo.id)}
                        className={`shrink-0 w-20 h-16 overflow-hidden border-2 transition-all duration-300 ${
                          modalView === photo.id
                            ? "border-[#c9a84c]"
                            : "border-transparent opacity-70 hover:opacity-100"
                        }`}
                        aria-label={photo.label}
                      >
                        <img
                          src={photo.src}
                          alt={photo.label}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative px-4 sm:px-6 pb-6 bg-[#faf8f5] overflow-hidden">
                  {hasMultiplePhotos && (
                    <>
                      <button
                        type="button"
                        onClick={() => goToPhoto("prev")}
                        className="absolute left-2 sm:left-3 top-1/2 z-10 -translate-y-1/2 bg-white/90 hover:bg-white text-[#1a1a2e] p-2 sm:p-2.5 shadow-md transition-colors"
                        aria-label="Previous photo"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => goToPhoto("next")}
                        className="absolute right-2 sm:right-3 top-1/2 z-10 -translate-y-1/2 bg-white/90 hover:bg-white text-[#1a1a2e] p-2 sm:p-2.5 shadow-md transition-colors"
                        aria-label="Next photo"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => goToPhoto("prev")}
                        className="absolute inset-y-6 left-2 sm:left-6 w-[30%] z-[1]"
                        aria-label="Previous photo"
                      />
                      <button
                        type="button"
                        onClick={() => goToPhoto("next")}
                        className="absolute inset-y-6 right-2 sm:right-6 w-[30%] z-[1]"
                        aria-label="Next photo"
                      />
                    </>
                  )}
                  <div className="flex items-center justify-center w-full min-h-[200px] max-h-[50vh] overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={activePhoto.id}
                        src={activePhoto.src}
                        alt={activePhoto.alt}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="relative z-0 max-w-full max-h-[50vh] w-auto h-auto object-contain select-none"
                        draggable={false}
                      />
                    </AnimatePresence>
                  </div>
                </div>
              </section>

              {selectedPlan.floorPlan && (
                <section className="p-4 sm:p-6 bg-white overflow-hidden">
                  <h3 className="text-lg md:text-xl font-bold text-[#1a1a2e] tracking-wide uppercase mb-4">
                    Floor Plan
                  </h3>
                  <div className="bg-[#faf8f5] border-2 border-[#1a1a2e]/10 p-3 sm:p-6 overflow-hidden flex items-center justify-center">
                    <img
                      src={selectedPlan.floorPlan}
                      alt={`${selectedPlan.name} floor plan`}
                      className="max-w-full max-h-[55vh] w-auto h-auto object-contain"
                    />
                  </div>
                </section>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-light text-[#1a1a2e] mb-4">
              Don't see the perfect{" "}
              <span className="italic font-semibold">plan?</span>
            </h2>
            <p className="text-[#1a1a2e]/60 leading-relaxed mb-8">
              Every Binks Homes plan can be customized — or we can design a
              completely new floor plan from scratch to match your vision, budget,
              and lot.
            </p>
            <Link
              to={createPageUrl("Contact")}
              className="inline-flex items-center gap-2 bg-[#1a1a2e] text-white px-8 py-3.5 text-xs tracking-[0.2em] uppercase font-medium hover:bg-[#c9a84c] transition-colors duration-300"
            >
              Request a Consultation
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
