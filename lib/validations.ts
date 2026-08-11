import { z } from "zod";

export const registerSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Enter a valid email address"),
    phone: z.string().min(6, "Enter a valid phone number"),
    organisation: z.string().optional(),
    password: z
      .string()
      .min(8, "At least 8 characters")
      .regex(/[A-Z]/, "Include an uppercase letter")
      .regex(/[0-9]/, "Include a number")
      .regex(/[^A-Za-z0-9]/, "Include a special character"),
    accountKind: z.enum(["client", "employer", "professional"]),
    agree: z.literal(true, {
      message: "You must accept the Terms & Privacy Policy",
    }),
  })
  .strict();

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const bookingIntakeSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(6, "Enter a valid phone number"),
  organisation: z.string().optional(),
  serviceId: z.string().min(1, "Select what you need help with"),
  issueDescription: z.string().min(10, "Tell us a bit more about your issue"),
});

export type BookingIntakeInput = z.infer<typeof bookingIntakeSchema>;

export const bookingCreateSchema = z.object({
  professionalId: z.string().min(1),
  serviceId: z.string().min(1),
  slotId: z.string().min(1),
  consultationType: z.enum(["ONLINE", "IN_PERSON"]),
  issueDescription: z.string().min(10),
});

export type BookingCreateInput = z.infer<typeof bookingCreateSchema>;

export const reviewSchema = z.object({
  bookingId: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(1),
});

export type ReviewInput = z.infer<typeof reviewSchema>;

export const messageSchema = z.object({
  bookingId: z.string().min(1),
  body: z.string().min(1),
});

export type MessageInput = z.infer<typeof messageSchema>;
