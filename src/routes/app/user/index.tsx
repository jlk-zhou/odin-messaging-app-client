import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

import Alert from "@mui/material/Alert";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import MainProfile from "./components/MainProfile";
import UserDetails from "./components/UserDetails";
import Options from "./components/Options";
import DangerZone from "./components/DangerZone";

export const Route = createFileRoute("/app/user/")({
  component: MyInfoPage,
  loader: ({ context }) => {
    return context.session.user;
  },
});

function MyInfoPage() {
  const user = Route.useLoaderData();

  return (
    <div className="flex min-h-screen w-screen flex-col items-center p-3">
      <div className="grid w-full grid-cols-[50px_1fr_50px]">
        <Link className="place-self-center" to="/app">
          <ArrowBackIcon className="fill-black" />
        </Link>
        <Alert className="invisible col-start-2">Success.</Alert>
      </div>
      <MainProfile
        image={user.image as string | undefined}
        fullName={user.name}
        username={user.username}
      />
      <UserDetails email={user.email} bio={user.bio} />
      <Options />
      <DangerZone />
    </div>
  );
}
