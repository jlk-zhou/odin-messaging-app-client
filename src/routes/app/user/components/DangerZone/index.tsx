import Button from "@mui/material/Button";
import { useState } from "react";
import DeleteWarning from "./DeleteWarning";

interface DangerZoneProps {
  username: string;
}

export default function DangerZone({ username }: DangerZoneProps) {
  const [deleteWarningOpen, setDeleteWarningOpen] = useState(false);
  function handleClickOpen() {
    setDeleteWarningOpen(true);
  }

  return (
    <div className="w-full">
      <h2 className="text-red-500">Danger Zone!</h2>
      <hr className="mb-5 text-red-500" />
      <div className="flex w-full justify-center">
        <Button
          variant="contained"
          color="warning"
          className="w-45"
          onClick={handleClickOpen}
        >
          Delete Account
        </Button>
        <DeleteWarning
          open={deleteWarningOpen}
          username={username}
          setDialogState={setDeleteWarningOpen}
        />
      </div>
    </div>
  );
}
