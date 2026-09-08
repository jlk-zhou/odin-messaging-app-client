import { createFileRoute } from "@tanstack/react-router";
import MyInfoPage from "./components/MyInfoPage";

export const Route = createFileRoute("/app/user/")({
  component: Index,
  loader: ({ context }) => {
    return context.session.user;
  },
});

function Index() {
  const user = Route.useLoaderData();

  return <MyInfoPage user={user} />;
}
