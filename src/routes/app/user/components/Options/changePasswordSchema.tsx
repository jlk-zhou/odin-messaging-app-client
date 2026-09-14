import * as z from "zod";

export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(5, "Password must be more than 8 characters.")
    .max(32, "Password must be under 32 characters."),
  newPassword: z.string(),
  confirmPassword: z.string(),
});
