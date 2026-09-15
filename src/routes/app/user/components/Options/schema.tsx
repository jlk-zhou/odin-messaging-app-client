import {
  confirmPasswordSchema,
  existingPasswordSchema,
  newPasswordSchema,
} from "#/routes/util/userFieldSchemas";
import * as z from "zod";

export const changePasswordSchema = z
  .object({
    currentPassword: existingPasswordSchema,
    newPassword: newPasswordSchema,
    confirmPassword: confirmPasswordSchema,
  })
  .refine(
    (data) => {
      return data.newPassword === data.confirmPassword;
    },
    {
      path: ["confirmPassword"],
      message: "Passwords must match.",
    },
  );
