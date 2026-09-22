import { Link } from "@tanstack/react-router";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import MainProfile from "../MainProfile";
import UserDetails from "../UserDetails";
import Options from "../Options";
import DangerZone from "../DangerZone";
import Notification from "#/routes/components/Notification";
import { useState } from "react";

interface MyInfoPageProps {
  user: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null | undefined;
    username?: string | null | undefined;
    displayUsername?: string | null | undefined;
    bio?: string | null | undefined;
  };
}

export default function MyInfoPage({ user }: MyInfoPageProps) {
  const [alertMessage, setAlertMessage] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-screen flex-col items-center p-3">
      <div className="grid w-full grid-cols-[50px_1fr_50px]">
        <Link className="place-self-center" to="/app">
          <ArrowBackIcon className="fill-black" />
        </Link>
      </div>
      <Notification
        open={alertOpen}
        setOpen={setAlertOpen}
        message={alertMessage}
      />
      <MainProfile
        image={user.image as string | undefined}
        fullName={user.name}
        username={user.username}
      />
      <UserDetails email={user.email} bio={user.bio} />
      <Options
        username={user.username as string}
        setAlertOpen={setAlertOpen}
        setAlertMessage={setAlertMessage}
      />
      <DangerZone username={user.username as string} />
    </div>
  );
}
