import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
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
    <Dialog open={open}>
      <DialogTitle>Delete Account @{username}?</DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>No</Button>
      </DialogActions>
    </Dialog>
  );
}
