import { authClient } from "#/lib/auth-client";
import { isRedirect, redirect, type ParsedLocation } from "@tanstack/react-router";

interface PortectRouteParams {
    location: ParsedLocation<{}>
}

export default async function protectRoute({ location }: PortectRouteParams) {
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
    } catch (error) {
      if (isRedirect(error)) throw error;

      throw redirect({
        to: "/sign-in",
        search: { redirect: location.href },
      });
    }
  }