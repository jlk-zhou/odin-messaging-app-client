import { http, HttpResponse } from "msw";
import * as cookie from "cookie";
import { addDays, subDays, subSeconds } from "date-fns";

interface User {
  token: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  createdAt: string;
  updatedAt: string;
  username: string;
  displayUsername?: string;
  password: string;
  id: string;
}

interface EmailCredentials {
  email: string;
  password: string;
}

interface UsernameCredentials {
  username: string;
  password: string;
}

// These users are all logged in since they all have a token
const existingUsers: User[] = [
  {
    token: "VerySecureTokenGetRichQuick",
    name: "Zach",
    email: "zach@example.com",
    emailVerified: false,
    image: null,
    createdAt: subDays(new Date(), 18).toISOString(),
    updatedAt: subDays(new Date(), 18).toISOString(),
    username: "zachjoejl134",
    displayUsername: "zachjoejl134",
    // This is really bad, don't EVER send over password in real settings
    password: "ImAGummyBear!123",
    id: "GoodUserId",
  },
  {
    token: "YetAnotherVerySecureToken",
    name: "Amanda",
    email: "amanda@example.com",
    emailVerified: false,
    image: null,
    createdAt: subDays(new Date(), 15).toISOString(),
    updatedAt: subDays(new Date(), 15).toISOString(),
    username: "amandathebadgirl",
    displayUsername: "amandathebadgirl",
    password: "GanMaYaNi!2456",
    id: "BadUserId",
  },
  {
    token: "ImANewbieDontBiteMe",
    name: "Newbie",
    email: "newbie@example.com",
    emailVerified: false,
    image: null,
    createdAt: subSeconds(new Date(), 30).toISOString(),
    updatedAt: subSeconds(new Date(), 30).toISOString(),
    username: "newbiewawawa",
    displayUsername: "newbiewawawa",
    password: "PasswordHahaha!67",
    id: "NewbieNotNoob",
  },
];

const stripPassword = (user: User | undefined) => {
  if (!user) return;
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

const createSessionCookie = (token: string) => {
  return cookie.stringifySetCookie({
    name: "sessionToken",
    // Each mock user in the test gets their own token
    value: token,
    domain: "localhost",
    path: "/",
    expires: addDays(new Date(), 7),
    httpOnly: true,
    secure: false,
  });
};

export const authHandlers = [
  // Sign up
  // This route won't actually create the user in the test environment
  // Instead it will only give you a mock new user called Newbie!
  // So make sure to hit this route with Newbie's details during test!
  http.post<{ token: string }, User>(
    `${process.env.SERVER_URL}/api/auth/sign-up/email`,
    async ({ request }) => {
      // Create a new user instance
      const body = await request.clone().json();

      const newUser = existingUsers.find((user) => {
        return user.email === body.email || user.username === body.username;
      });
      // User already exists (newbie doesn't count as existing user)
      if (newUser && newUser.token !== "ImANewbieDontBiteMe") {
        return new HttpResponse(
          { error: "User already exists." },
          { status: 400 },
        );
      } else if (newUser) {
        // We found newbie!
        const newCookie = createSessionCookie(newUser.token);
        return HttpResponse.json(
          {
            token: newUser.token,
            user: stripPassword(newUser),
          },
          {
            headers: { "set-cookie": newCookie },
          },
        );
      } else {
        // Only allow signing up as newbie for testing, lest things get out of control
        return new HttpResponse(
          {
            error:
              "For testing purposes, please only register yourself as the user 'Newbie.'",
          },
          {
            status: 400,
          },
        );
      }
    },
  ),

  // Sign in with email
  http.post<{ token: string }, EmailCredentials>(
    `${process.env.SERVER_URL}/api/auth/sign-in/email`,
    async ({ request }) => {
      const credentials = await request.clone().json();
      // Check user credential with mock user
      const userSigningIn = existingUsers.find((user) => {
        return user.email === credentials.email;
      });
      if (userSigningIn?.password !== credentials.password) {
        return new HttpResponse(
          { error: "Invalid email or password" },
          { status: 401 },
        );
      }

      // Define new session cookie
      const renewalCookie: string = createSessionCookie(userSigningIn.token);

      // Return the signed in mock user in response body
      return HttpResponse.json(
        {
          token: userSigningIn.token,
          user: stripPassword(userSigningIn),
        },
        {
          // Set the renewed cookie
          headers: {
            "set-cookie": renewalCookie,
          },
        },
      );
    },
  ),

  // Sign in with username
  http.post<{ token: string }, UsernameCredentials>(
    `${process.env.SERVER_URL}/api/auth/sign-in/email`,
    async ({ request }) => {
      const credentials = await request.clone().json();
      // Check user credential with mock user
      const userSigningIn = existingUsers.find((user) => {
        return user.username === credentials.username;
      });
      if (userSigningIn?.password !== credentials.password) {
        return new HttpResponse(
          { error: "Invalid username or password" },
          { status: 401 },
        );
      }

      // Define new session cookie
      const renewalCookie: string = createSessionCookie(userSigningIn.token);

      // Return the signed in mock user in response body
      return HttpResponse.json(
        {
          token: userSigningIn.token,
          user: stripPassword(userSigningIn),
        },
        {
          // Set the renewed cookie
          headers: {
            "set-cookie": renewalCookie,
          },
        },
      );
    },
  ),

  // Get session
  http.get(
    `${process.env.SERVER_URL}/api/auth/get-session`,
    async ({ cookies }) => {
      // Use the cookie set in other routes to find current user
      const currentUser = existingUsers.find((user) => {
        return user.token === cookies.sessionToken;
      });
      if (!currentUser) {
        // 401, like I don't know who you are until you log in
        return new HttpResponse(null, { status: 401 });
      }

      // Return the user with the session token
      // No need to set any cookie this time
      return HttpResponse.json({
        token: currentUser.token,
        user: stripPassword(currentUser),
      });
    },
  ),

  // Sign out
  http.post(`${process.env.SERVER_URL}/api/auth/sign-out`, async () => {
    // Clear all authentication-related cookies
    const clearSessionTokenCookie: cookie.SetCookie = {
      name: "sessionToken",
      value: "",
      maxAge: 0,
      path: "/",
      sameSite: "lax",
    };

    return HttpResponse.json(
      { success: true },
      {
        // Actually clear those defined cookies by setting them in headers
        headers: {
          "set-cookie": cookie.stringifySetCookie(clearSessionTokenCookie),
        },
      },
    );
  }),
];
