import Alert from "@mui/material/Alert";
import Snackbar, { type SnackbarCloseReason } from "@mui/material/Snackbar";

interface NotificationProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
}

export default function Notification({
  open,
  setOpen,
  message,
}: NotificationProps) {
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <Alert severity="success" onClose={handleClose}>
        {message}
      </Alert>
    </Snackbar>
  );
}
