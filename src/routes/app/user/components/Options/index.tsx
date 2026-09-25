import Button from "@mui/material/Button";
import { useState } from "react";
import ConfirmSignOut from "./ConfirmSignOut";
import ChangePassword from "./ChangePassword";

interface OptionsProps {
  username: string;
  className?: string;
}

export default function Options({ username, className }: OptionsProps) {
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  function handleChangePasswordClick() {
    setChangePasswordOpen(true);
  }

  const [logOutOpen, setLogOutOpen] = useState(false);
  function handleLogOutClick() {
    setLogOutOpen(true);
  }
  function handleLogOutClose() {
    setLogOutOpen(false);
  }

  return (
    <div
      className={`my-5 flex w-full flex-col items-center gap-3 ${className}`}
    >
      <Button
        variant="contained"
        className="w-45"
        onClick={handleChangePasswordClick}
      >
        Change Password
      </Button>
      <ChangePassword
        open={changePasswordOpen}
        setDialogState={setChangePasswordOpen}
      />
      <Button variant="contained" className="w-45" onClick={handleLogOutClick}>
        Sign Out
      </Button>
      <ConfirmSignOut
        open={logOutOpen}
        handleClose={handleLogOutClose}
        username={username}
      />
    </div>
  );
}
