import { authClient } from "#/lib/auth-client";
import {
  createFileRoute,
  isRedirect,
  Outlet,
  redirect,
} from "@tanstack/react-router";

export const Route = createFileRoute("/app")({
  component: AppLayout,
  beforeLoad: async ({ location }) => {
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
  },
});

function AppLayout() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">Welcome to TanStack Start</h1>
      <p className="mt-4 text-lg">
        Edit <code>src/routes/index.tsx</code> to get started.
      </p>
      <Outlet />
    </div>
  );
}
