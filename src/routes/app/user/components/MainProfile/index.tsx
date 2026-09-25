import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import EditInfoContainer from "../EditInfoContainer/index.tsx";

interface MainProfileProps {
  image?: string;
  fullName: string;
  username?: string | null | undefined;
  className?: string;
}

export default function MainProfile({
  image,
  fullName,
  username = "",
  className,
}: MainProfileProps) {
  return (
    <div className={`my-4 flex flex-col items-center ${className}`}>
      {/* Avatar module */}
      <div className="relative my-2 flex h-fit flex-col items-center justify-center gap-6">
        <Avatar
          className="size-30"
          role="img"
          aria-label="avatar"
          src={image}
          alt="User avatar"
        ></Avatar>
        {/* For mobile: click the button since one cannot hover */}
        <Button variant="contained">Change Avatar</Button>
        {/* For medium screen and up: hover and click the avatar itself to change */}
      </div>
      {/* Full Name */}
      <EditInfoContainer info="full-name">
        <h1 className="col-span-3 col-start-2 my-3 text-center text-2xl">
          {fullName}
        </h1>
      </EditInfoContainer>
      {/* Username */}
      <EditInfoContainer info="username">
        {username && (
          <p className="col-span-3 col-start-2 my-1 text-lg">@{username}</p>
        )}
      </EditInfoContainer>
    </div>
  );
}
