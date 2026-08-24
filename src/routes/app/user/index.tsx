import { createFileRoute } from "@tanstack/react-router"
import protectRoute from "../helpers/protectRoute"

import Alert from "@mui/material/Alert"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import EditIcon from "@mui/icons-material/Edit"

export const Route = createFileRoute("/app/user/")({
  component: RouteComponent,
  beforeLoad: async ({ location }) => {
    await protectRoute({ location })
  },
})

function RouteComponent() {
  return (<div className="flex justify-center items-center h-screen">
    <div className="flex flex-col items-center h-fit w-90 border-2 p-10">
      <Alert className="invisible">Successfully changed password. </Alert>
      {/* Bio component, including avatar, name, and username */}
      <div className="flex flex-col items-center my-4">
        {/* Avatar module */}
        <div className="group my-2 relative w-fit h-fit flex justify-center items-center cursor-pointer">
          <Avatar className="group-hover:brightness-50 size-30"></Avatar>
          <Button className="absolute">
            <CameraAltIcon className="hidden group-hover:block size-12 fill-black" />
          </Button>
        </div>
        {/* Todo: Create a 3-column grid in order to align the edit buttons vertically */}
        {/* Name module */}
        <div className="grid grid-cols-5 place-items-center group">
          <h1 className="text-3xl text-center my-3 col-start-2 col-span-3">Zach Joe</h1>
          <Button className="p-0 col-start-5 bg-transparent">
            <EditIcon className="hidden group-hover:block cursor-pointer fill-black" />
          </Button>
        </div>
        {/* Username module */}
        <div className="grid grid-cols-5 place-items-center group">
          <p className="my-1 col-start-2 col-span-3">@zachjoe2456</p>
          <Button className="p-0 col-start-5 bg-transparent">
            <EditIcon className="hidden group-hover:block cursor-pointer fill-black" />
          </Button>
        </div>
      </div>
      {/* Email */}
      <div>
        <p className="ml-2">Email</p>
        <div className="grid grid-cols-5 group">
          <p className="ml-2 col-start-1 col-span-4 self-center">zachjoe@example.com</p>
          <Button className="p-0 col-start-5 place-self-center bg-transparent">
            <EditIcon className="hidden group-hover:block cursor-pointer fill-black" />
          </Button>
        </div>
      </div>
      {/* Bio */}
      <div className="mb-15">
        <p className="ml-2">Bio</p>
        <div className="grid grid-cols-5 group">
          <p className="ml-2 col-start-1 col-span-4 self-center">Not your average gay</p>
          <Button className="p-0 col-start-5 place-self-center bg-transparent">
            <EditIcon className="hidden group-hover:block cursor-pointer fill-black" />
          </Button>
        </div>
      </div>
      {/* Options */}
      <div className="flex flex-col gap-3 my-5">
        <Button variant="contained" className="w-45">Change Password</Button>
        <Button variant="contained">Log Out</Button>
      </div>
      {/* Danger Zone */}
      <div className="w-full">
        <p className="text-red-500">Danger Zone!</p>
        <hr className="text-red-500 mb-5" />
        <div className="flex justify-center w-full">
          <Button variant="contained" color="warning" className="w-45">Delete Account</Button>
        </div>
      </div>
    </div>
  </div>)
}
