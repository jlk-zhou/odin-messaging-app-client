import { authClient } from "#/lib/auth-client";
import {
  createFileRoute,
  isRedirect,
  Outlet,
  redirect,
} from "@tanstack/react-router";

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
  return (
    <div className="flex">
      <Outlet />
    </div>
  );
}
