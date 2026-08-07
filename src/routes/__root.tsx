import { Outlet, createRootRoute } from '@tanstack/react-router'

import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import '../styles.css'

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: RootNotFoundComponent,
})

function RootComponent() {
  return (
    <>
      <Outlet />
      {!import.meta.env.TEST && (
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'TanStack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
      )}
    </>
  )
}

function RootNotFoundComponent() {
  return (
    <>
      <h1>Sorry, but the page you've requested is nowhere to be found.</h1>
    </>
  )
}
