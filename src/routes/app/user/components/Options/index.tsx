import React from "react";
import Button from "@mui/material/Button";
import { useState } from "react";
import ConfirmLogOut from "./ConfirmLogOut";
import ChangePassword from "./ChangePassword";

interface OptionsProps {
  username: string;
  setAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAlertMessage: React.Dispatch<React.SetStateAction<string>>;
}

export default function Options({
  username,
  setAlertOpen,
  setAlertMessage,
}: OptionsProps) {
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
    <div className="my-5 flex flex-col gap-3">
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
        setAlertOpen={setAlertOpen}
        setAlertMessage={setAlertMessage}
      />
      <Button variant="contained" onClick={handleLogOutClick}>
        Log Out
      </Button>
      <ConfirmLogOut
        open={logOutOpen}
        handleClose={handleLogOutClose}
        username={username}
      />
    </div>
  );
}
