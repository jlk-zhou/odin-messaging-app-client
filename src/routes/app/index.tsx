import Button from "@mui/material/Button";

import { authClient } from "#/lib/auth-client";
import {
  createFileRoute,
  useNavigate,
} from "@tanstack/react-router";
import { useState } from "react";
import protectRoute from "./helpers/protectRoute";

export const Route = createFileRoute("/app/")({
  component: Home,
  beforeLoad: async ({ location }) => {
    await protectRoute({ location })
  },
});

function Home() {
  const navigate = useNavigate({ from: "/" });
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
    <div className="p-8">
      <h1 className="text-4xl font-bold">Welcome to TanStack Start</h1>
      <p className="mt-4 text-lg">
        Edit <code>src/routes/index.tsx</code> to get started.
      </p>
      <Button
        className="mt-4"
        variant="contained"
        loading={isSigningOut}
        onClick={handleClick}
      >
        Sign Out
      </Button>
    </div>
  );
}
