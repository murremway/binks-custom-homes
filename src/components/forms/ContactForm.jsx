import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitContactForm } from "@/lib/submitForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import {
  contactDefaultValues,
  contactSchema,
} from "@/lib/schemas/contactSchema";
import {
  FormFieldShell,
  FormSection,
  formInputClassName,
  formTextareaClassName,
} from "@/components/forms/FormSection";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: contactDefaultValues,
    mode: "onBlur",
  });

  const onSubmit = async (values) => {
    try {
      await submitContactForm(values);
      setSent(true);
      toast.success("Message sent! We'll reply to your email soon.");
    } catch {
      toast.error("Failed to send message. Please call us at (223) 259-9834.");
    }
  };

  if (sent) {
    return (
      <div className="text-center py-12">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-light text-[#1a1a2e] mb-2">Message Sent!</h3>
        <p className="text-[#1a1a2e]/50">
          Your message was delivered to our team. We'll get back to you within 24
          hours.
        </p>
        <Button
          onClick={() => {
            setSent(false);
            reset(contactDefaultValues);
          }}
          variant="outline"
          className="mt-6"
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
      <FormSection
        title="Your Information"
        description="We'll use this to follow up with you directly."
      >
        <div className="grid md:grid-cols-2 gap-6">
          <FormFieldShell label="Full Name" required error={errors.full_name?.message}>
            <Input
              {...register("full_name")}
              autoComplete="name"
              placeholder="John Smith"
              className={formInputClassName}
            />
          </FormFieldShell>
          <FormFieldShell label="Email" required error={errors.email?.message}>
            <Input
              {...register("email")}
              type="email"
              autoComplete="email"
              placeholder="john@example.com"
              className={formInputClassName}
            />
          </FormFieldShell>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <FormFieldShell label="Phone" error={errors.phone?.message}>
            <Input
              {...register("phone")}
              type="tel"
              autoComplete="tel"
              placeholder="(223) 555-0190"
              className={formInputClassName}
            />
          </FormFieldShell>
          <FormFieldShell label="Subject" error={errors.subject?.message}>
            <Input
              {...register("subject")}
              placeholder="New Home Inquiry"
              className={formInputClassName}
            />
          </FormFieldShell>
        </div>
      </FormSection>

      <FormSection
        title="Your Message"
        description="Tell us about your project, timeline, or any questions you have."
      >
        <FormFieldShell label="Message" required error={errors.message?.message}>
          <Textarea
            {...register("message")}
            placeholder="Tell us about your project..."
            className={formTextareaClassName}
          />
        </FormFieldShell>
      </FormSection>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#1a1a2e] hover:bg-[#2a2a3e] text-white h-12 rounded-none tracking-wider uppercase text-xs font-medium"
      >
        {isSubmitting ? (
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
        ) : (
          <Send className="w-4 h-4 mr-2" />
        )}
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
