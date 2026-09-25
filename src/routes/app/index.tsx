import { createFileRoute } from "@tanstack/react-router";
import ForumIcon from "@mui/icons-material/Forum";
import Layout from "./components/Layout";

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
      <Layout className="block w-full sm:hidden" userImage={user.image} />
      {/* Wider screen default initial appearance when no chat is selected */}
      <div className="hidden w-full text-[240px] sm:flex sm:items-center sm:justify-center">
        <ForumIcon fontSize="inherit" className="text-gray-200" />
      </div>
    </>
  );
}
