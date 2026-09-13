import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { authClient } from "#/lib/auth-client";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

interface ConfirmLogOutProps {
  open: boolean;
  handleClose: () => void;
  username: string;
}

export default function ConfirmLogOut({
  open,
  handleClose,
  username,
}: ConfirmLogOutProps) {
  const navigate = useNavigate({ from: "/app/user/" });
  const [isSigningOut, setIsSigningOut] = useState(false);
  async function handleClick() {
    await authClient.signOut({
      fetchOptions: {
        onLoading: () => {
          setIsSigningOut(true);
        },
        onSuccess: () => {
          navigate({ to: "/sign-in" });
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
      <DialogTitle id="dialog-title">Log out from @{username}?</DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button loading={isSigningOut} onClick={handleClick}>
          Log Out
        </Button>
      </DialogActions>
    </Dialog>
  );
}
