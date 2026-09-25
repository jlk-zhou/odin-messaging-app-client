import Button from "@mui/material/Button";
import { useState } from "react";
import DeleteWarning from "./DeleteWarning";

interface DangerZoneProps {
  username: string;
  className?: string;
}

export default function DangerZone({ username, className }: DangerZoneProps) {
  const [deleteWarningOpen, setDeleteWarningOpen] = useState(false);
  function handleClickOpen() {
    setDeleteWarningOpen(true);
  }

  return (
    <div className={`w-full ${className}`}>
      <h2 className="text-red-700">Danger Zone!</h2>
      <hr className="mb-5 text-red-700" />
      <div className="flex w-full justify-center">
        <Button
          variant="contained"
          color="warning"
          className="w-45 bg-red-700 hover:bg-red-800"
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
