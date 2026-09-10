import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import PasswordField from "#/routes/components/PasswordField";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { passwordFormSchema } from "./passwordFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "#/lib/auth-client";

interface DeleteWarningProps {
  open: boolean;
  username: string;
  setDialogState: (value: React.SetStateAction<boolean>) => void;
}

export default function DeleteWarning({
  open,
  username,
  setDialogState,
}: DeleteWarningProps) {
  const form = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    mode: "onTouched",
    defaultValues: {
      password: "",
    },
  });

  function handleClose() {
    form.reset();
    setDialogState(false);
  }

  async function onSubmit(data: z.infer<typeof passwordFormSchema>) {
    const response = await authClient.deleteUser({
      password: data.password,
    });
    if (response.error?.code === "INVALID_PASSWORD") {
      form.setError("password", { message: "Your password is incorrect." });
    }
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete Account @{username}?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Your account information and all of your messages will be deleted.
        </DialogContentText>
        <DialogContentText>
          This action is permanent and irreversible.
        </DialogContentText>
        <DialogContentText>
          To proceed, enter your password below.
        </DialogContentText>
        <form
          method="post"
          onSubmit={form.handleSubmit(onSubmit)}
          id="confirm-by-password"
        >
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <PasswordField
                {...field}
                className="mt-3 w-full"
                fieldState={fieldState}
              />
            )}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained">
          No
        </Button>
        <Button
          loading={form.formState.isSubmitting}
          type="submit"
          form="confirm-by-password"
        >
          Yes, I understand and wish to proceed
        </Button>
      </DialogActions>
    </Dialog>
  );
}
