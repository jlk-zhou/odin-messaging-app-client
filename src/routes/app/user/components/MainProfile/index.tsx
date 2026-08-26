import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import EditInfoContainer from "../EditInfoContainer/index.tsx";

export default function MainProfile() {
  return (
    <div className="my-4 flex flex-col items-center">
      {/* Avatar module */}
      <div className="group relative my-2 flex h-fit w-fit cursor-pointer items-center justify-center">
        <Avatar
          className="size-30 group-hover:brightness-50"
          role="img"
          aria-label="avatar"
        ></Avatar>
        <Button className="absolute" aria-label="Edit avatar image">
          <CameraAltIcon className="hidden size-12 fill-black group-hover:block" />
        </Button>
      </div>
      {/* Full Name */}
      <EditInfoContainer info="full-name">
        <h1 className="col-span-3 col-start-2 my-3 text-center text-3xl">
          Zach Joe
        </h1>
      </EditInfoContainer>
      {/* Username */}
      <EditInfoContainer info="username">
        <p className="col-span-3 col-start-2 my-1">@zachjoe2456</p>
      </EditInfoContainer>
    </div>
  );
}
