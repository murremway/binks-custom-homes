import React, { useState } from "react";
import { motion } from "framer-motion";
import { API_CONFIG } from "../components/shared/apiConfig";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ShieldCheck,
  Upload,
  Send,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Wrench,
  Clock,
  FileCheck,
} from "lucide-react";
import { toast } from "sonner";

const claimCategories = [
  { value: "structural", label: "Structural" },
  { value: "plumbing", label: "Plumbing" },
  { value: "electrical", label: "Electrical" },
  { value: "hvac", label: "HVAC" },
  { value: "roofing", label: "Roofing" },
  { value: "flooring", label: "Flooring" },
  { value: "paint_drywall", label: "Paint & Drywall" },
  { value: "windows_doors", label: "Windows & Doors" },
  { value: "appliances", label: "Appliances" },
  { value: "other", label: "Other" },
];

const urgencyLevels = [
  { value: "low", label: "Low — Minor cosmetic issue" },
  { value: "medium", label: "Medium — Functional but not urgent" },
  { value: "high", label: "High — Affecting daily use" },
  { value: "emergency", label: "Emergency — Immediate attention needed" },
];

const processSteps = [
  {
    icon: FileCheck,
    title: "Submit Claim",
    description: "Fill out the warranty claim form with details about your issue.",
  },
  {
    icon: Clock,
    title: "Review",
    description: "Our team reviews your claim within 1-2 business days.",
  },
  {
    icon: Wrench,
    title: "Resolution",
    description: "We schedule and complete the necessary repairs promptly.",
  },
];

export default function Warranty() {
  const [form, setForm] = useState({
    owner_name: "",
    email: "",
    phone: "",
    property_address: "",
    closing_date: "",
    claim_category: "",
    description: "",
    urgency: "medium",
  });
  const [photos, setPhotos] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSelectChange = (name, value) => {
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    const uploadedUrls = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);
      const response = await fetch(API_CONFIG.uploadFile, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      uploadedUrls.push(data.file_url);
    }

    setPhotos((prev) => [...prev, ...uploadedUrls]);
    setUploading(false);
    toast.success(`${files.length} photo(s) uploaded`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      const response = await fetch(API_CONFIG.submitWarrantyClaim, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, photos })
      });
      const data = await response.json();
      if (data.success) {
        setSent(true);
        toast.success("Warranty claim submitted successfully!");
      } else {
        toast.error("Failed to submit claim. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to submit claim. Please try again.");
    }
    
    setSending(false);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&q=80"
            alt="Warranty"
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
                Homeowner Support
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-light text-white">
              Warranty <span className="italic font-semibold text-[#c9a84c]">Claims</span>
            </h1>
            <p className="text-white/60 mt-4 max-w-lg text-lg">
              We stand behind every home we build. Submit a warranty claim and
              we'll take care of the rest.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-white border-b border-[#1a1a2e]/5">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-3 gap-8">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-[#c9a84c]/10 flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-5 h-5 text-[#c9a84c]" />
                  </div>
                  {i < processSteps.length - 1 && (
                    <div className="w-px h-full bg-[#c9a84c]/20 my-2 hidden md:block" />
                  )}
                </div>
                <div>
                  <div className="text-[10px] tracking-widest uppercase text-[#c9a84c] mb-1 font-medium">
                    Step {i + 1}
                  </div>
                  <h3 className="font-medium text-[#1a1a2e] mb-1">
                    {step.title}
                  </h3>
                  <p className="text-[#1a1a2e]/50 text-sm">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-20 bg-[#faf8f5]">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-10 shadow-sm"
          >
            {sent ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-light text-[#1a1a2e] mb-2">
                  Claim Submitted!
                </h3>
                <p className="text-[#1a1a2e]/50 max-w-md mx-auto">
                  Your warranty claim has been received. Our team will review it
                  and respond within 1-2 business days.
                </p>
                <Button
                  onClick={() => {
                    setSent(false);
                    setForm({
                      owner_name: "",
                      email: "",
                      phone: "",
                      property_address: "",
                      closing_date: "",
                      claim_category: "",
                      description: "",
                      urgency: "medium",
                    });
                    setPhotos([]);
                  }}
                  variant="outline"
                  className="mt-6"
                >
                  Submit Another Claim
                </Button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-8">
                  <ShieldCheck className="w-6 h-6 text-[#c9a84c]" />
                  <h2 className="text-xl font-medium text-[#1a1a2e]">
                    Submit a Warranty Claim
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Info */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs tracking-wider uppercase text-[#1a1a2e]/50 font-medium mb-2 block">
                        Homeowner Name *
                      </label>
                      <Input
                        name="owner_name"
                        value={form.owner_name}
                        onChange={handleChange}
                        required
                        placeholder="John Smith"
                        className="border-[#1a1a2e]/10 focus:border-[#c9a84c] rounded-none h-12"
                      />
                    </div>
                    <div>
                      <label className="text-xs tracking-wider uppercase text-[#1a1a2e]/50 font-medium mb-2 block">
                        Email *
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="border-[#1a1a2e]/10 focus:border-[#c9a84c] rounded-none h-12"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs tracking-wider uppercase text-[#1a1a2e]/50 font-medium mb-2 block">
                        Phone
                      </label>
                      <Input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="(480) 555-0190"
                        className="border-[#1a1a2e]/10 focus:border-[#c9a84c] rounded-none h-12"
                      />
                    </div>
                    <div>
                      <label className="text-xs tracking-wider uppercase text-[#1a1a2e]/50 font-medium mb-2 block">
                        Closing Date
                      </label>
                      <Input
                        name="closing_date"
                        type="date"
                        value={form.closing_date}
                        onChange={handleChange}
                        className="border-[#1a1a2e]/10 focus:border-[#c9a84c] rounded-none h-12"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs tracking-wider uppercase text-[#1a1a2e]/50 font-medium mb-2 block">
                      Property Address *
                    </label>
                    <Input
                      name="property_address"
                      value={form.property_address}
                      onChange={handleChange}
                      required
                      placeholder="1234 Your Street, City, State, ZIP"
                      className="border-[#1a1a2e]/10 focus:border-[#c9a84c] rounded-none h-12"
                    />
                  </div>

                  {/* Claim Details */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs tracking-wider uppercase text-[#1a1a2e]/50 font-medium mb-2 block">
                        Issue Category *
                      </label>
                      <Select
                        value={form.claim_category}
                        onValueChange={(val) =>
                          handleSelectChange("claim_category", val)
                        }
                        required
                      >
                        <SelectTrigger className="border-[#1a1a2e]/10 focus:border-[#c9a84c] rounded-none h-12">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {claimCategories.map((cat) => (
                            <SelectItem key={cat.value} value={cat.value}>
                              {cat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-xs tracking-wider uppercase text-[#1a1a2e]/50 font-medium mb-2 block">
                        Urgency Level
                      </label>
                      <Select
                        value={form.urgency}
                        onValueChange={(val) =>
                          handleSelectChange("urgency", val)
                        }
                      >
                        <SelectTrigger className="border-[#1a1a2e]/10 focus:border-[#c9a84c] rounded-none h-12">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {urgencyLevels.map((u) => (
                            <SelectItem key={u.value} value={u.value}>
                              {u.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs tracking-wider uppercase text-[#1a1a2e]/50 font-medium mb-2 block">
                      Description of Issue *
                    </label>
                    <Textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      required
                      placeholder="Please describe the issue in detail, including when it started and how it affects your home..."
                      className="border-[#1a1a2e]/10 focus:border-[#c9a84c] rounded-none min-h-[150px]"
                    />
                  </div>

                  {/* Photo Upload */}
                  <div>
                    <label className="text-xs tracking-wider uppercase text-[#1a1a2e]/50 font-medium mb-2 block">
                      Upload Photos
                    </label>
                    <div className="border-2 border-dashed border-[#1a1a2e]/10 p-6 text-center hover:border-[#c9a84c]/40 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                        id="photo-upload"
                      />
                      <label
                        htmlFor="photo-upload"
                        className="cursor-pointer flex flex-col items-center gap-2"
                      >
                        {uploading ? (
                          <Loader2 className="w-8 h-8 text-[#c9a84c] animate-spin" />
                        ) : (
                          <Upload className="w-8 h-8 text-[#1a1a2e]/20" />
                        )}
                        <span className="text-sm text-[#1a1a2e]/40">
                          {uploading
                            ? "Uploading..."
                            : "Click to upload photos of the issue"}
                        </span>
                      </label>
                    </div>
                    {photos.length > 0 && (
                      <div className="flex flex-wrap gap-3 mt-4">
                        {photos.map((url, i) => (
                          <div
                            key={i}
                            className="relative w-20 h-20 overflow-hidden border border-[#1a1a2e]/10"
                          >
                            <img
                              src={url}
                              alt={`Upload ${i + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setPhotos((prev) =>
                                  prev.filter((_, idx) => idx !== i)
                                )
                              }
                              className="absolute top-0.5 right-0.5 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {form.urgency === "emergency" && (
                    <div className="flex items-start gap-3 bg-red-50 border border-red-200 p-4">
                      <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-red-800">
                          Emergency Situation?
                        </p>
                        <p className="text-xs text-red-600 mt-1">
                          If this is an emergency (water leak, gas smell, etc.),
                          please also call us directly at{" "}
                          <strong>(717) 559-2933</strong> for immediate
                          assistance.
                        </p>
                      </div>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={sending || !form.claim_category}
                    className="w-full bg-[#1a1a2e] hover:bg-[#2a2a3e] text-white h-12 rounded-none tracking-wider uppercase text-xs font-medium"
                  >
                    {sending ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <Send className="w-4 h-4 mr-2" />
                    )}
                    {sending ? "Submitting..." : "Submit Warranty Claim"}
                  </Button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}