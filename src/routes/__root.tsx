import { Outlet, createRootRoute } from "@tanstack/react-router";

import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";

import Notification from "./components/Notification";

import "../styles.css";
import { useNotification } from "./components/Notification/store";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: RootNotFoundComponent,
});

function RootComponent() {
  const open = useNotification((state) => state.open);
  const setOpen = useNotification((state) => state.setOpen);
  const message = useNotification((state) => state.message);

  return (
    <>
      <Notification open={open} setOpen={setOpen} message={message} />
      <Outlet />
      {!import.meta.env.TEST && (
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "TanStack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
      )}
    </>
  );
}

function RootNotFoundComponent() {
  return (
    <>
      <h1>Sorry, but the page you've requested is nowhere to be found.</h1>
    </>
  );
}
