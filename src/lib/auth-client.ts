import { createAuthClient } from "better-auth/react";
import {
  inferAdditionalFields,
  usernameClient,
} from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_SERVER_URL,
  plugins: [
    usernameClient(),
    inferAdditionalFields({
      user: {
        bio: {
          type: "string",
          required: false,
        },
      },
    }),
  ],
});
