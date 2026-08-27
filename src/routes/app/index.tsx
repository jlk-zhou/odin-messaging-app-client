import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

import Avatar from "@mui/material/Avatar";

export const Route = createFileRoute("/app/")({
  component: Welcome,
  loader: ({ context }) => {
    return context.session.user;
  },
});

/**
 * Default display for the app's main section with neither chats nor
 * self user profile selected. Will only show on wide screen devices.  
 * @returns A React component for the main section when idle.
 */
function Welcome() {
  const user = Route.useLoaderData();

  return (
    <>
      <div className="flex min-h-screen w-screen p-6">
        <div className="grid h-24 w-full grid-cols-4 grid-rows-2">
          <Link className="row-span-2 mt-3 justify-self-center" to="/app/user">
            <Avatar
              className="size-14"
              src={user.image as string | undefined}
            ></Avatar>
          </Link>
          <h1 className="col-span-full col-start-2 ml-3 self-center text-2xl">
            Chats
          </h1>
        </div>
      </div>
    </>
  );
}
