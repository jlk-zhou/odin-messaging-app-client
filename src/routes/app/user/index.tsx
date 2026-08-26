import { createFileRoute } from "@tanstack/react-router";
import protectRoute from "../helpers/protectRoute";

import Alert from "@mui/material/Alert";

import MainProfile from "./components/MainProfile";
import UserDetails from "./components/UserDetails";
import DangerZone from "./components/DangerZone";
import Options from "./components/Options";

export const Route = createFileRoute("/app/user/")({
  component: MyInfoPage,
  beforeLoad: async ({ location }) => {
    await protectRoute({ location });
  },
});

function MyInfoPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex h-fit w-90 flex-col items-center border-2 p-10">
        <Alert className="invisible">Successfully changed password. </Alert>
        <MainProfile />
        <UserDetails />
        <Options />
        <DangerZone />
      </div>
    </div>
  );
}
