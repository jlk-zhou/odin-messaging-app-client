import { useRouter } from "@tanstack/react-router";

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
    <div className="@container flex w-full flex-col">
      {/* Top banner, so far there's only a back arrow */}
      <div className="z-10 flex h-12 w-full items-center bg-gray-500">
        <Button onClick={() => router.history.back()}>
          <ArrowBackIcon className="fill-white" />
        </Button>
      </div>
      {/* Main user info page */}
      <div className="flex h-screen w-full flex-col items-center overflow-y-auto overscroll-contain">
        <div className="flex w-full max-w-220 grow flex-col justify-between px-18 @max-[500px]:px-10 @max-[400px]:px-5">
          <div>
            <MainProfile
              image={user.image as string | undefined}
              fullName={user.name}
              username={user.username}
              className="my-9 w-full"
            />
            <UserDetails className="w-full" email={user.email} bio={user.bio} />
            <Options className="my-15" username={user.username as string} />
          </div>
          <DangerZone className="mb-24" username={user.username as string} />
        </div>
      </div>
    </div>
  );
}
