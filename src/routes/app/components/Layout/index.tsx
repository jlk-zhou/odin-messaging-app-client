import { Link } from "@tanstack/react-router";
import Avatar from "@mui/material/Avatar";

interface LayoutProps {
  userImage?: string | null | undefined;
  className?: string;
}

export default function Layout({ userImage, className }: LayoutProps) {
  return (
    <div className={`flex p-6 sm:bg-gray-100 ${className}`}>
      <div className="grid grid-cols-4 grid-rows-2">
        <Link
          className="group row-span-2 h-fit w-fit place-self-center"
          to="/app/user"
          aria-label="To user info page"
        >
          <Avatar
            className="size-14 group-hover:brightness-80"
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
