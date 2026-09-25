import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { authClient } from "#/lib/auth-client";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

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
  const setSeverity = useNotification((state) => state.setSeverity);

  async function handleClick() {
    await authClient.signOut({
      fetchOptions: {
        onLoading: () => {
          setIsSigningOut(true);
        },
        onSuccess: () => {
          navigate({ to: "/sign-in" });
          setSeverity("success");
          setMessage("Signed out successfully.");
          setOpen(true);
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
      <div className="flex max-w-80 flex-col gap-5 p-4">
        <div className="flex w-full justify-between">
          <DialogTitle className="mx-2 p-0">Sign Out</DialogTitle>
          <IconButton className="p-0" aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <DialogContent className="px-5 py-0">
          Sign out from @{username}?
        </DialogContent>
        <DialogActions className="flex gap-3 max-sm:flex-col sm:items-stretch sm:justify-center">
          <Button
            variant="contained"
            className="m-0 w-full max-w-30 sm:w-60"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            className="m-0 w-full max-w-30 sm:w-60"
            loading={isSigningOut}
            onClick={handleClick}
          >
            Sign Out
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
}
