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
import { useNotification } from "#/routes/components/Notification/store";

interface ChangePasswordProps {
  open: boolean;
  setDialogState: (value: React.SetStateAction<boolean>) => void;
}

export default function ChangePassword({
  open,
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

  const setAlertOpen = useNotification((state) => state.setOpen);
  const setAlertMessage = useNotification((state) => state.setMessage);

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
    setAlertOpen(true);
    setAlertMessage("Successfully changed password. ");
    handleClose();
  }

  function handleClose() {
    form.reset();
    setDialogState(false);
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <div className="flex max-w-100 flex-col gap-5 p-4">
        <div className="flex w-full justify-between">
          <DialogTitle className="mx-2 p-0">Changing Password</DialogTitle>
          <IconButton className="p-0" aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <DialogContent className="p-0">
          <form
            className="flex flex-col gap-2"
            onSubmit={form.handleSubmit(onSubmit)}
          >
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
            <DialogContentText>
              Please enter your new password:
            </DialogContentText>
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
            <DialogActions className="flex flex-col gap-3">
              <Button
                variant="contained"
                className="w-full max-w-45"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                className="m-0 w-full max-w-45"
                type="submit"
              >
                Change Password
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </div>
    </Dialog>
  );
}
