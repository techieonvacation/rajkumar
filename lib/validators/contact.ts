import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters"),
  email: z
    .string()
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .max(20, "Phone number too long")
    .optional()
    .or(z.literal("")),
  company: z
    .string()
    .max(150, "Company name too long")
    .optional()
    .or(z.literal("")),
  country: z
    .string()
    .max(100, "Country too long")
    .optional()
    .or(z.literal("")),
  service: z
    .string()
    .max(100, "Service field too long")
    .optional()
    .or(z.literal("")),
  budget: z
    .string()
    .max(50, "Budget field too long")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .min(20, "Message must be at least 20 characters")
    .max(5000, "Message must be under 5000 characters"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const quickContactSchema = contactSchema
  .pick({ name: true, email: true, phone: true, message: true })
  .extend({
    subject: z
      .string()
      .min(2, "Subject must be at least 2 characters")
      .max(100, "Subject must be under 100 characters"),
  });

export type QuickContactValues = z.infer<typeof quickContactSchema>;
