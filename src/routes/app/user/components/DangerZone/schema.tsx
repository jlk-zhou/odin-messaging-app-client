import { existingPasswordSchema } from "#/routes/util/userFieldSchemas";
import * as z from "zod";

export const passwordFormSchema = z.object({
  password: existingPasswordSchema,
});
