import Button from "@mui/material/Button";
import { useState } from "react";
import ConfirmLogOut from "./ConfirmLogOut";

interface OptionsProps {
  username: string;
}

export default function Options({ username }: OptionsProps) {
  const [open, setOpen] = useState(false);
  function handleClick() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }

  return (
    <div className="my-5 flex flex-col gap-3">
      <Button variant="contained" className="w-45">
        Change Password
      </Button>
      <Button variant="contained" onClick={handleClick}>
        Log Out
      </Button>
      <ConfirmLogOut
        open={open}
        handleClose={handleClose}
        username={username}
      />
    </div>
  );
}
