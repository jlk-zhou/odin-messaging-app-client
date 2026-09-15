import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  confirmPasswordSchema,
  existingPasswordSchema,
  newPasswordSchema,
} from "#/routes/util/userFieldSchemas";

import { Controller } from "react-hook-form";
import PasswordFieldComponent from "./index";

export default function PasswordsForm() {
  const passwordFormSchema = z
    .object({
      password: existingPasswordSchema,
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

  const form = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    mode: "onTouched",
    defaultValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  return (
    <form>
      <h1>Password Form</h1>
      <Controller
        name="password"
        control={form.control}
        render={({ field, fieldState }) => (
          <PasswordFieldComponent {...field} fieldState={fieldState} />
        )}
      />
      <Controller
        name="newPassword"
        control={form.control}
        render={({ field, fieldState }) => (
          <PasswordFieldComponent
            {...field}
            fieldState={fieldState}
            isNew={true}
          />
        )}
      />
      <Controller
        name="confirmPassword"
        control={form.control}
        render={({ field, fieldState }) => (
          <PasswordFieldComponent
            {...field}
            fieldState={fieldState}
            confirming={true}
          />
        )}
      />
    </form>
  );
}
