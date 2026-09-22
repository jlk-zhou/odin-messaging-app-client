import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { changePasswordSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import PasswordField from "#/routes/components/PasswordField";
import { authClient } from "#/lib/auth-client";

interface ChangePasswordProps {
  open: boolean;
  setDialogState: (value: React.SetStateAction<boolean>) => void;
  setAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAlertMessage: React.Dispatch<React.SetStateAction<string>>;
}

export default function ChangePassword({
  open,
  setAlertOpen,
  setAlertMessage,
  setDialogState,
}: ChangePasswordProps) {
  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onTouched",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof changePasswordSchema>) {
    const response = await authClient.changePassword({
      newPassword: data.newPassword,
      currentPassword: data.currentPassword,
      revokeOtherSessions: true,
    });
    if (response.error?.code === "INVALID_PASSWORD") {
      form.setError("currentPassword", { message: "Incorrect password." });
      return;
    }
    handleClose();
  }

  function handleClose() {
    form.reset();
    setAlertOpen(true);
    setAlertMessage("Successfully changed password. ");
    setDialogState(false);
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ m: 0, p: 2 }}>Changing Password</DialogTitle>
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
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogContentText>
            To change your password, you will need to enter your current
            password.
          </DialogContentText>
          <Controller
            name="currentPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <PasswordField
                {...field}
                className="w-full"
                fieldState={fieldState}
              />
            )}
          />
          <DialogContentText>Please enter your new password:</DialogContentText>
          <Controller
            name="newPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <PasswordField
                {...field}
                className="w-full"
                fieldState={fieldState}
                isNew={true}
              />
            )}
          />
          <DialogContentText>
            Please confirm your new password:
          </DialogContentText>
          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <PasswordField
                {...field}
                className="w-full"
                fieldState={fieldState}
                confirming={true}
              />
            )}
          />
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Change Password</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
