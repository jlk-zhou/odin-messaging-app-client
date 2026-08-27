import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * By default, the app will redirect user to the "/app" route
 * if they hit the "/" index route.
 * The "/app" route will then redirect user to the sign in
 * route if they have not yet signed in.,
 */
export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({
      to: "/app",
    });
  },
});
