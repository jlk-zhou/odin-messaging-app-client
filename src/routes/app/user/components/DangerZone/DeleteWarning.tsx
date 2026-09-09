import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import PasswordField from "#/routes/components/PasswordField";

interface DeleteWarningProps {
  open: boolean;
  username: string;
  handleClose: () => void;
}

export default function DeleteWarning({
  open,
  username,
  handleClose,
}: DeleteWarningProps) {
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
        <form id="confirm-by-password">
          <PasswordField className="mt-3 w-full" />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <Button type="submit" form="confirm-by-password">
          Yes, I understand and wish to proceed
        </Button>
      </DialogActions>
    </Dialog>
  );
}
