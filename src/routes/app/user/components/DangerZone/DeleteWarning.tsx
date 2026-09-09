import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

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
        <p>
          Your account information and all of your messages will be deleted.
        </p>
        <p>This action is permanent and irreversible.</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <Button>Yes, I understand and wish to proceed</Button>
      </DialogActions>
    </Dialog>
  );
}
