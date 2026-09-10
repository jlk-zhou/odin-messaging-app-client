import * as z from "zod";

export const passwordFormSchema = z.object({
  password: z
    .string("Please enter a password.")
    .min(8, "Password must be more than 8 characters.")
    .max(32, "Password must be under 32 characters."),
});
