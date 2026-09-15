import * as z from "zod";
import * as _ from "lodash-es";
import {
  confirmPasswordSchema,
  emailSchema,
  nameSchema,
  newPasswordSchema,
  usernameSchema,
} from "#/routes/util/userFieldSchemas";

export const signUpFormSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    username: usernameSchema,
    password: newPasswordSchema,
    confirmPassword: confirmPasswordSchema,
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      path: ["confirmPassword"],
      message: "Passwords must match.",
    },
  );
