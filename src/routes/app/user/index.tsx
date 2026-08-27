import { createFileRoute } from "@tanstack/react-router";

import Alert from "@mui/material/Alert";

import MainProfile from "./components/MainProfile";
import UserDetails from "./components/UserDetails";
import DangerZone from "./components/DangerZone";
import Options from "./components/Options";

export const Route = createFileRoute("/app/user/")({
  component: MyInfoPage,
  loader: ({ context }) => {
    return context.session.user;
  },
});

function MyInfoPage() {
  const user = Route.useLoaderData();

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex h-fit w-90 flex-col items-center border-2 p-10">
        <Alert className="invisible">Successfully changed password. </Alert>
        <MainProfile
          image={user.image as string | undefined}
          fullName={user.name}
          username={user.username}
        />
        <UserDetails email={user.email} bio={user.bio} />
        <Options />
        <DangerZone />
      </div>
    </div>
  );
}
