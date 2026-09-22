import { Link } from "@tanstack/react-router";

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
  return (
    <div className="flex min-h-screen w-screen flex-col items-center p-3">
      <div className="grid w-full grid-cols-[50px_1fr_50px]">
        <Link className="place-self-center" to="/app">
          <ArrowBackIcon className="fill-black" />
        </Link>
      </div>
      <MainProfile
        image={user.image as string | undefined}
        fullName={user.name}
        username={user.username}
      />
      <UserDetails email={user.email} bio={user.bio} />
      <Options username={user.username as string} />
      <DangerZone username={user.username as string} />
    </div>
  );
}
