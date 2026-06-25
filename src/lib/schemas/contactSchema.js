import { z } from "zod";

export const contactSchema = z.object({
  full_name: z
    .string()
    .trim()
    .min(2, "Please enter your full name"),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z.string().trim().optional(),
  subject: z.string().trim().optional(),
  message: z
    .string()
    .trim()
    .min(10, "Please include a few more details in your message"),
});

export const contactDefaultValues = {
  full_name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};
