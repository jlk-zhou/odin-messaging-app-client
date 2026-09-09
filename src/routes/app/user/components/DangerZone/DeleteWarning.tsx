import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

interface DeleteWarningProps {
  open: boolean;
  username: string;
}

export default function DeleteWarning({ open, username }: DeleteWarningProps) {
  return (
    <Dialog open={open}>
      <DialogTitle>Delete Account @{username}?</DialogTitle>
    </Dialog>
  );
}
