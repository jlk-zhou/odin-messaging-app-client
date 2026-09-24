import { createFileRoute } from "@tanstack/react-router";

import Welcome from "./components/Welcome";

export const Route = createFileRoute("/app/")({
  component: Index,
  loader: ({ context }) => {
    return context.session.user;
  },
});

/**
 * Default display for the app's main section with neither chats nor
 * self user profile selected. Will only show on wide screen devices.  
 * @returns A React component for the main section when idle.
 */
function Index() {
  const user = Route.useLoaderData();
  return (
    <>
      <Welcome className="block sm:hidden" userImage={user.image} />
      <div className="hidden sm:block">All the chats will appear here</div>
    </>
  );
}
