import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitWarrantyClaimForm } from "@/lib/submitForm";
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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import {
  warrantyDefaultValues,
  warrantySchema,
  warrantyStepFields,
} from "@/lib/schemas/warrantySchema";
import {
  FormFieldShell,
  FormSection,
  formInputClassName,
  formTextareaClassName,
} from "@/components/forms/FormSection";

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

const stepLabels = ["Contact", "Property", "Issue"];

export default function WarrantyClaimForm() {
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);
  const [photos, setPhotos] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(warrantySchema),
    defaultValues: warrantyDefaultValues,
    mode: "onBlur",
  });

  const urgency = watch("urgency");
  const claimCategory = watch("claim_category");

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const newPhotos = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setPhotos((prev) => [...prev, ...newPhotos]);
    toast.success(`${files.length} photo(s) added`);
    e.target.value = "";
  };

  const removePhoto = (preview) => {
    setPhotos((prev) => {
      const photo = prev.find((item) => item.preview === preview);
      if (photo) URL.revokeObjectURL(photo.preview);
      return prev.filter((item) => item.preview !== preview);
    });
  };

  const goNext = async () => {
    const valid = await trigger(warrantyStepFields[step]);
    if (valid) setStep((current) => Math.min(current + 1, stepLabels.length - 1));
  };

  const onSubmit = async (values) => {
    try {
      await submitWarrantyClaimForm(
        values,
        photos.map((photo) => photo.file),
      );
      setSent(true);
      toast.success("Warranty claim submitted successfully!");
    } catch {
      toast.error("Failed to submit claim. Please call us at (223) 259-9834.");
    }
  };

  if (sent) {
    return (
      <div className="text-center py-12">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-light text-[#1a1a2e] mb-2">Claim Submitted!</h3>
        <p className="text-[#1a1a2e]/50 max-w-md mx-auto">
          Your warranty claim was sent to our team. We'll review it and respond
          within 1-2 business days.
        </p>
        <Button
          onClick={() => {
            setSent(false);
            setStep(0);
            photos.forEach((photo) => URL.revokeObjectURL(photo.preview));
            setPhotos([]);
            reset(warrantyDefaultValues);
          }}
          variant="outline"
          className="mt-6"
        >
          Submit Another Claim
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <ShieldCheck className="w-6 h-6 text-[#c9a84c]" />
        <h2 className="text-xl font-medium text-[#1a1a2e]">Submit a Warranty Claim</h2>
      </div>

      <div className="flex gap-2 mb-8">
        {stepLabels.map((label, index) => (
          <div key={label} className="flex-1">
            <div
              className={`h-1 mb-2 transition-colors ${
                index <= step ? "bg-[#c9a84c]" : "bg-[#1a1a2e]/10"
              }`}
            />
            <p
              className={`text-[10px] tracking-widest uppercase ${
                index === step ? "text-[#1a1a2e] font-medium" : "text-[#1a1a2e]/40"
              }`}
            >
              {index + 1}. {label}
            </p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
        {step === 0 && (
          <FormSection
            title="Contact Information"
            description="How should we reach you about this claim?"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <FormFieldShell
                label="Homeowner Name"
                required
                error={errors.owner_name?.message}
              >
                <Input
                  {...register("owner_name")}
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
            <FormFieldShell label="Phone" error={errors.phone?.message}>
              <Input
                {...register("phone")}
                type="tel"
                autoComplete="tel"
                placeholder="(223) 555-0190"
                className={formInputClassName}
              />
            </FormFieldShell>
          </FormSection>
        )}

        {step === 1 && (
          <FormSection
            title="Property Details"
            description="Tell us which home this claim is for."
          >
            <FormFieldShell
              label="Property Address"
              required
              error={errors.property_address?.message}
            >
              <Input
                {...register("property_address")}
                autoComplete="street-address"
                placeholder="1234 Your Street, City, State, ZIP"
                className={formInputClassName}
              />
            </FormFieldShell>
            <FormFieldShell label="Closing Date" error={errors.closing_date?.message}>
              <Input
                {...register("closing_date")}
                type="date"
                className={formInputClassName}
              />
            </FormFieldShell>
          </FormSection>
        )}

        {step === 2 && (
          <FormSection
            title="Issue Details"
            description="Describe the problem and add photos if you have them."
          >
            <div className="grid md:grid-cols-2 gap-6">
              <FormFieldShell
                label="Issue Category"
                required
                error={errors.claim_category?.message}
              >
                <Select
                  value={claimCategory}
                  onValueChange={(value) =>
                    setValue("claim_category", value, { shouldValidate: true })
                  }
                >
                  <SelectTrigger className={`${formInputClassName} w-full`}>
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
              </FormFieldShell>
              <FormFieldShell label="Urgency Level" error={errors.urgency?.message}>
                <Select
                  value={urgency}
                  onValueChange={(value) =>
                    setValue("urgency", value, { shouldValidate: true })
                  }
                >
                  <SelectTrigger className={`${formInputClassName} w-full`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {urgencyLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormFieldShell>
            </div>

            <FormFieldShell
              label="Description of Issue"
              required
              error={errors.description?.message}
            >
              <Textarea
                {...register("description")}
                placeholder="Please describe the issue in detail, including when it started and how it affects your home..."
                className={formTextareaClassName}
              />
            </FormFieldShell>

            <FormFieldShell label="Upload Photos">
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
                  <Upload className="w-8 h-8 text-[#1a1a2e]/20" />
                  <span className="text-sm text-[#1a1a2e]/40">
                    Click to upload photos of the issue
                  </span>
                </label>
              </div>
              {photos.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-4">
                  {photos.map((photo, index) => (
                    <div
                      key={photo.preview}
                      className="relative w-20 h-20 overflow-hidden border border-[#1a1a2e]/10"
                    >
                      <img
                        src={photo.preview}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(photo.preview)}
                        className="absolute top-0.5 right-0.5 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </FormFieldShell>

            {urgency === "emergency" && (
              <div className="flex items-start gap-3 bg-red-50 border border-red-200 p-4">
                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-800">Emergency Situation?</p>
                  <p className="text-xs text-red-600 mt-1">
                    If this is an emergency (water leak, gas smell, etc.), please also
                    call us directly at <strong>(223) 259-9834</strong> for immediate
                    assistance.
                  </p>
                </div>
              </div>
            )}
          </FormSection>
        )}

        <div className="flex gap-3">
          {step > 0 && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep((current) => current - 1)}
              className="flex-1 h-12 rounded-none"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}

          {step < stepLabels.length - 1 ? (
            <Button
              type="button"
              onClick={goNext}
              className="flex-1 bg-[#1a1a2e] hover:bg-[#2a2a3e] text-white h-12 rounded-none tracking-wider uppercase text-xs font-medium"
            >
              Continue
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-[#1a1a2e] hover:bg-[#2a2a3e] text-white h-12 rounded-none tracking-wider uppercase text-xs font-medium"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Send className="w-4 h-4 mr-2" />
              )}
              {isSubmitting ? "Submitting..." : "Submit Warranty Claim"}
            </Button>
          )}
        </div>
      </form>
    </>
  );
}
