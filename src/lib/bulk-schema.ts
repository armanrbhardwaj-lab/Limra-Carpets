import { z } from "zod";

export const bulkSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  company: z.string().trim().min(2, "Please enter your business or company").max(120),
  phone: z.string().trim().regex(/^(\+?91[\s-]?)?[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  email: z.union([z.literal(""), z.string().trim().email("Enter a valid email").max(255)]),
  city: z.string().trim().min(2, "Please enter your city").max(80),
  quantity: z.coerce.number({ invalid_type_error: "Enter a number" }).int().min(10, "Bulk orders start at 10 pieces / sq ft units").max(1000000),
  carpetType: z.string().min(1, "Choose a carpet type"),
  message: z.string().trim().max(1000, "Max 1000 characters"),
});

export type BulkForm = z.infer<typeof bulkSchema>;
