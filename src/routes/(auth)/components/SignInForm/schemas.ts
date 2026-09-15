import {
  emailSchema,
  existingPasswordSchema,
  usernameSchema,
} from "#/routes/util/userFieldSchemas";
import * as z from "zod";

export const emailSignInSchema = z.object({
  email: emailSchema,
  password: existingPasswordSchema,
});

export const usernameSignInSchema = z.object({
  username: usernameSchema,
  password: existingPasswordSchema,
});
