import { createAuthClient } from "better-auth/react";
import { usernameClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
  // fetchOptions: {
  //   credentials: 'include',
  //   headers: {
  //     Origin: 'http://localhost:5173/',
  //     'Access-Control-Allow-Origin': 'http://localhost:5173/',
  //   },
  // },
  plugins: [usernameClient()],
});
