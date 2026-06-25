import { z } from "zod";

export const warrantySchema = z.object({
  owner_name: z
    .string()
    .trim()
    .min(2, "Please enter the homeowner name"),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z.string().trim().optional(),
  property_address: z
    .string()
    .trim()
    .min(5, "Please enter the property address"),
  closing_date: z.string().trim().optional(),
  claim_category: z.string().min(1, "Please select an issue category"),
  description: z
    .string()
    .trim()
    .min(20, "Please describe the issue in more detail"),
  urgency: z.enum(["low", "medium", "high", "emergency"]),
});

export const warrantyDefaultValues = {
  owner_name: "",
  email: "",
  phone: "",
  property_address: "",
  closing_date: "",
  claim_category: "",
  description: "",
  urgency: "medium",
};

export const warrantyStepFields = [
  ["owner_name", "email", "phone"],
  ["property_address", "closing_date"],
  ["claim_category", "urgency", "description"],
];
