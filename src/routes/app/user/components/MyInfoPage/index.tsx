import { Link, useRouter } from "@tanstack/react-router";

import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import MainProfile from "../MainProfile";
import UserDetails from "../UserDetails";
import Options from "../Options";
import DangerZone from "../DangerZone";

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
  const router = useRouter();

  return (
    <div className="flex h-screen w-full flex-col items-center overflow-y-auto overscroll-contain p-3">
      <Button className="self-start" onClick={() => router.history.back()}>
        <ArrowBackIcon className="fill-black" />
      </Button>
      <MainProfile
        image={user.image as string | undefined}
        fullName={user.name}
        username={user.username}
        className="my-12"
      />
      <UserDetails email={user.email} bio={user.bio} />
      <Options className="my-15" username={user.username as string} />
      <DangerZone className="my-12" username={user.username as string} />
    </div>
  );
}
