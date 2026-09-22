import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { authClient } from "#/lib/auth-client";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useNotification } from "#/routes/components/Notification/store";

interface ConfirmSignOutProps {
  open: boolean;
  handleClose: () => void;
  username: string;
}

export default function ConfirmSignOut({
  open,
  handleClose,
  username,
}: ConfirmSignOutProps) {
  const navigate = useNavigate({ from: "/app/user/" });
  const [isSigningOut, setIsSigningOut] = useState(false);

  const setOpen = useNotification((state) => state.setOpen);
  const setMessage = useNotification((state) => state.setMessage);

  async function handleClick() {
    await authClient.signOut({
      fetchOptions: {
        onLoading: () => {
          setIsSigningOut(true);
        },
        onSuccess: () => {
          navigate({ to: "/sign-in" });
          setOpen(true);
          setMessage("Signed out successfully.");
        },
      },
    });
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="dialog-title"
      role="alertdialog"
    >
      <DialogTitle id="dialog-title">Sign out from @{username}?</DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button loading={isSigningOut} onClick={handleClick}>
          Sign Out
        </Button>
      </DialogActions>
    </Dialog>
  );
}
