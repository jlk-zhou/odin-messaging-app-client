import { authClient } from "#/lib/auth-client";
import {
  createFileRoute,
  isRedirect,
  Outlet,
  redirect,
} from "@tanstack/react-router";

import Layout from "./components/Layout";

export async function protectRoute({ location }: any) {
  try {
    const { data: session, error } = await authClient.getSession();
    if (error) {
      throw error;
    }
    if (!session) {
      throw redirect({
        to: "/sign-in",
        search: {
          redirect: location.href,
        },
      });
    }
    return { session };
  } catch (error) {
    if (isRedirect(error)) throw error;
    throw redirect({
      to: "/sign-in",
      search: { redirect: location.href },
    });
  }
}

/**
 * Layout route for the entire app. Mainly to put the main app
 * content behind an authentication wall.
 */
export const Route = createFileRoute("/app")({
  component: AppLayout,
  beforeLoad: protectRoute,
  loader: ({ context }) => {
    return context.session.user;
  },
});

/**
 * The app's layout. In wide screen devices such as computers
 * it will display a chat list on the left. The main app section
 * where user sends messages, change personal information, etc,
 * will be on the right. Will display the idle component when
 * there's no chat to select.
 * @returns A React component for the app's layout.
 */
function AppLayout() {
  const user = Route.useLoaderData();
  return (
    <div className="flex min-w-screen">
      <Layout
        className="hidden h-screen w-full overflow-y-auto overscroll-contain sm:block sm:max-w-4/9 sm:min-w-4/9 md:max-w-2/5 md:min-w-2/5 lg:max-w-1/3 lg:min-w-1/3"
        userImage={user.image}
      />
      <Outlet />
    </div>
  );
}
