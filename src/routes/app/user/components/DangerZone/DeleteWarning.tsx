import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import PasswordField from "#/routes/components/PasswordField";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";

interface DeleteWarningProps {
  open: boolean;
  username: string;
  handleClose: () => void;
}

interface PasswordFormInput {
  password: string;
}

export default function DeleteWarning({
  open,
  username,
  handleClose,
}: DeleteWarningProps) {
  const { control, handleSubmit } = useForm<PasswordFormInput>({});

  const onSubmit: SubmitHandler<PasswordFormInput> = (data) => {
    console.log(data);
  };

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
        <form
          method="post"
          onSubmit={handleSubmit(onSubmit)}
          id="confirm-by-password"
        >
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <PasswordField {...field} className="mt-3 w-full" />
            )}
          />
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
