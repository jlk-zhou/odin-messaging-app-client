import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { changePasswordSchema } from "./changePasswordSchema";
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

interface ChangePasswordProps {
  open: boolean;
  handleClose: () => void;
}

export default function ChangePassword({
  open,
  handleClose,
}: ChangePasswordProps) {
  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
    },
  });

  function onSubmit(data: z.infer<typeof changePasswordSchema>) {
    console.log(data);
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
                label="Current Password"
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
                label="New Password"
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
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button>Change Password</Button>
      </DialogActions>
    </Dialog>
  );
}
