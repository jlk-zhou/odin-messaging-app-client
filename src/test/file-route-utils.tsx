import { render } from '@testing-library/react'
import {
  createRouter,
  createMemoryHistory,
  RouterProvider,
} from '@tanstack/react-router'
import { routeTree } from '#/routeTree.gen'

export function renderTestRouter(initialLocation = '/') {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({
      initialEntries: [initialLocation],
    }),
  })
  return { ...render(<RouterProvider router={router} />) }
}
