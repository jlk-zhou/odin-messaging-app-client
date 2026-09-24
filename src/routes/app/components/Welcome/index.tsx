import { Link } from "@tanstack/react-router";
import Avatar from "@mui/material/Avatar";

interface WelcomeProps {
  userImage?: string | null | undefined;
  className?: string;
}

export default function Welcome({ userImage, className }: WelcomeProps) {
  return (
    <div className={`flex h-screen p-6 ${className}`}>
      <div className="grid h-24 w-full grid-cols-4 grid-rows-2">
        <Link
          className="row-span-2 mt-3 justify-self-center"
          to="/app/user"
          aria-label="To user info page"
        >
          <Avatar
            className="size-14"
            src={userImage as string | undefined}
            alt="User profile image"
          ></Avatar>
        </Link>
        <h1 className="col-span-full col-start-2 ml-3 self-center text-2xl">
          Chats
        </h1>
      </div>
    </div>
  );
}
