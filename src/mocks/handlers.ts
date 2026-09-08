import { http, HttpResponse } from "msw";
import { addDays } from "date-fns";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const handlers = [
  http.get(`${serverUrl}/api/auth/get-session`, () => {
    console.log("mocked");
    return HttpResponse.json({
      session: {
        id: "1",
        expiresAt: addDays(new Date(), 7),
        token: "secureToken",
        createdAt: new Date(),
        updatedAt: new Date(),
        ipAddress: "0.0.0.0",
        userAgent: "aCuteCat",
        userId: "1",
      },
      user: {
        id: "1",
        name: "Zach Joe",
        email: "zachjoe@example.com",
        emailVerified: false,
        image: "example.png",
        createdAt: new Date(),
        updatedAt: new Date(),
        username: "zachjoe2456",
        displayUsername: "zachjoe2456",
        bio: "Not your average gay",
      },
    });
  }),
];
