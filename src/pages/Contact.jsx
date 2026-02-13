import React, { useState } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      const response = await base44.functions.invoke('submitContact', form);
      if (response.data.success) {
        setSent(true);
        toast.success("Message sent successfully!");
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    }
    
    setSending(false);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=1920&q=80"
            alt="Contact"
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
                Get In Touch
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-light text-white">
              Contact <span className="italic font-semibold text-[#c9a84c]">Us</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-5 gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-light text-[#1a1a2e] mb-8">
                  Let's Start a{" "}
                  <span className="italic font-semibold">Conversation</span>
                </h2>

                <div className="space-y-6">
                  {[

                    {
                      icon: Phone,
                      title: "Call Us",
                      lines: ["(223) 259-9834"],
                    },
                    {
                      icon: Mail,
                      title: "Email Us",
                      lines: ["admin@binkshomes.org"],
                    },
                    {
                      icon: Clock,
                      title: "Office Hours",
                      lines: ["Mon–Fri: 8am – 4pm"],
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-4">
                      <div className="w-10 h-10 bg-[#c9a84c]/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-4 h-4 text-[#c9a84c]" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-[#1a1a2e] mb-1">
                          {item.title}
                        </h3>
                        {item.lines.map((line) => (
                          <p key={line} className="text-[#1a1a2e]/50 text-sm">
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white p-8 md:p-10 shadow-sm"
              >
                {sent ? (
                  <div className="text-center py-12">
                    <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-light text-[#1a1a2e] mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-[#1a1a2e]/50">
                      We'll get back to you within 24 hours.
                    </p>
                    <Button
                      onClick={() => {
                        setSent(false);
                        setForm({ full_name: "", email: "", phone: "", subject: "", message: "" });
                      }}
                      variant="outline"
                      className="mt-6"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-xs tracking-wider uppercase text-[#1a1a2e]/50 font-medium mb-2 block">
                          Full Name *
                        </label>
                        <Input
                          name="full_name"
                          value={form.full_name}
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
                          Subject
                        </label>
                        <Input
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          placeholder="New Home Inquiry"
                          className="border-[#1a1a2e]/10 focus:border-[#c9a84c] rounded-none h-12"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs tracking-wider uppercase text-[#1a1a2e]/50 font-medium mb-2 block">
                        Message *
                      </label>
                      <Textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        placeholder="Tell us about your project..."
                        className="border-[#1a1a2e]/10 focus:border-[#c9a84c] rounded-none min-h-[150px]"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={sending}
                      className="w-full bg-[#1a1a2e] hover:bg-[#2a2a3e] text-white h-12 rounded-none tracking-wider uppercase text-xs font-medium"
                    >
                      {sending ? (
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      ) : (
                        <Send className="w-4 h-4 mr-2" />
                      )}
                      {sending ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}