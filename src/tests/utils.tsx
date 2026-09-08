import { render, type RenderOptions } from "@testing-library/react";
import {
  createRouter,
  createMemoryHistory,
  RouterProvider,
  createRootRoute,
  Outlet,
  createRoute,
} from "@tanstack/react-router";
import { routeTree } from "#/routeTree.gen";
import type React from "react";

interface RenderRouteOptions {
  initialLocation?: string;
  routerContext?: any;
}

export async function renderTestRouter({
  initialLocation = "/",
  routerContext = {},
  ...renderOptions
}: RenderRouteOptions = {}) {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({
      initialEntries: [initialLocation],
    }),
    context: routerContext,
  });
  return {
    ...render(<RouterProvider router={router} />, {
      ...renderOptions,
    }),
    router,
  };
}

interface RenderWithFileRoutesOptions extends Omit<RenderOptions, "wrapper"> {
  routePath?: string;
  initialLocation?: string;
  routerContext?: any;
}

export function renderWithFileRoutes(
  ui: React.ReactElement,
  {
    routePath = "/",
    initialLocation = "/",
    routerContext = {},
    ...renderOptions
  }: RenderWithFileRoutesOptions = {},
) {
  const rootRoute = createRootRoute({
    component: () => <Outlet />,
  });

  const testRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: routePath,
    component: () => ui,
  });

  const routeTree = rootRoute.addChildren([testRoute]);

  const router = createRouter({
    routeTree,
    history: createMemoryHistory({
      initialEntries: [initialLocation],
    }),
    context: routerContext,
  });

  return {
    ...render(<RouterProvider router={router} />, {
      ...renderOptions,
    }),
    router,
  };
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
