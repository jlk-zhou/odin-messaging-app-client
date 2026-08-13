import { render } from "@testing-library/react";
import {
  createRouter,
  createMemoryHistory,
  RouterProvider,
  createRootRoute,
} from "@tanstack/react-router";
import { routeTree } from "#/routeTree.gen";
import type React from "react";

export function renderTestRouter(initialLocation = "/") {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({
      initialEntries: [initialLocation],
    }),
  });
  return { ...render(<RouterProvider router={router} />) };
}

/**
 * Wrapper for testing individual component with useNavigation or
 * other useRouter hooks.
 * @param component
 * @param initialEntries
 */
export function renderComponent(
  component: React.JSX.Element,
  initialEntries = ["/"],
) {
  const rootRoute = createRootRoute({
    component: () => component,
    notFoundComponent: () => <p>Not Found</p>,
    errorComponent: () => <p>Error</p>,
  });
  const router = createRouter({
    routeTree: rootRoute,
    history: createMemoryHistory({ initialEntries: initialEntries }),
  });
  render(<RouterProvider router={router} />);
}
