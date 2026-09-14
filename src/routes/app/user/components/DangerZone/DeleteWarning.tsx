import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import PasswordField from "#/routes/components/PasswordField";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { passwordFormSchema } from "./passwordFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "#/lib/auth-client";
import { useNavigate } from "@tanstack/react-router";

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

  const navigate = useNavigate({ from: "/app/user/" });
  async function onSubmit(data: z.infer<typeof passwordFormSchema>) {
    const response = await authClient.deleteUser({
      password: data.password,
      fetchOptions: {
        onSuccess: () => navigate({ to: "/sign-in" }),
      },
    });
    if (response.error?.code === "INVALID_PASSWORD") {
      form.setError("password", { message: "Your password is incorrect." });
    }
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ m: 0, p: 2 }}>Delete Account @{username}?</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
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
