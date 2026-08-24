import { createFileRoute } from "@tanstack/react-router"
import protectRoute from "./helpers/protectRoute"

export const Route = createFileRoute("/app/user")({
  component: RouteComponent,
  beforeLoad: async ({ location }) => {
    await protectRoute({ location })
  }, 
})

function RouteComponent() {
  return <div>Hello "/app/user"!</div>
}
