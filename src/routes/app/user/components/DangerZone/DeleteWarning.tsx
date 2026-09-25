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
import { passwordFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "#/lib/auth-client";
import { useNavigate } from "@tanstack/react-router";
import { useNotification } from "#/routes/components/Notification/store";

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

  const setAlertOpen = useNotification((state) => state.setOpen);
  const setAlertMessage = useNotification((state) => state.setMessage);
  const setAlertSeverity = useNotification((state) => state.setSeverity);

  function handleClose() {
    form.reset();
    setDialogState(false);
  }

  const navigate = useNavigate({ from: "/app/user/" });
  async function onSubmit(data: z.infer<typeof passwordFormSchema>) {
    const response = await authClient.deleteUser({
      password: data.password,
      fetchOptions: {
        onSuccess: () => {
          navigate({ to: "/sign-in" });
          setAlertSeverity("success");
          setAlertMessage("You account has been deleted. Sorry to see you go!");
          setAlertOpen(true);
        },
      },
    });
    if (response.error?.code === "INVALID_PASSWORD") {
      form.setError("password", { message: "Incorrect password." });
    }
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <div className="flex flex-col gap-5 p-6 max-md:max-w-100 md:max-w-120">
        <div className="flex w-full justify-between">
          <DialogTitle className="p-0">Delete Account?</DialogTitle>
          <IconButton className="p-0" aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <DialogContent className="flex flex-col gap-2 p-0">
          <DialogContentText>
            You are about to delete your account{" "}
            <span className="font-bold">@{username}</span>.
          </DialogContentText>
          <DialogContentText>
            Your account information and all of your messages will be deleted.
          </DialogContentText>
          <DialogContentText className="font-bold">
            This action is permanent and irreversible.
          </DialogContentText>
          <DialogContentText>
            To delete your account, please enter your password below.
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
        <DialogActions className="flex gap-3 max-md:flex-col md:items-stretch">
          <Button
            onClick={handleClose}
            variant="contained"
            className="m-0 w-full max-w-55"
          >
            Cancel
          </Button>
          <Button
            loading={form.formState.isSubmitting}
            type="submit"
            form="confirm-by-password"
            variant="contained"
            className="m-0 w-full max-w-55 bg-red-700 hover:bg-red-800"
          >
            I understand and wish to delete my account
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
}
