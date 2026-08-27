import { authClient } from "#/lib/auth-client";
import Button from "@mui/material/Button";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export default function Options() {
  const navigate = useNavigate({ from: "/app/user/" });
  const [isSigningOut, setIsSigningOut] = useState(false);
  async function handleClick() {
    await authClient.signOut({
      fetchOptions: {
        onLoading: () => {
          setIsSigningOut(true);
        },
        onSuccess: () => {
          navigate({ to: "/sign-in" });
        },
      },
    });
  }

  return (
    <div className="my-5 flex flex-col gap-3">
      <Button variant="contained" className="w-45">
        Change Password
      </Button>
      <Button variant="contained" loading={isSigningOut} onClick={handleClick}>
        Log Out
      </Button>
    </div>
  );
}
