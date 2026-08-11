import { http, HttpResponse } from "msw";
import * as cookie from "cookie";
import { addDays, subDays } from "date-fns";

interface User {
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  createdAt: string;
  updatedAt: string;
  username: string;
  displayName?: string;
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

export const authHandlers = [
  // Sign up
  http.post<{ token: string }, User>(
    `${process.env.SERVER_URL}/api/auth/sign-up/email`,
    async ({ request }) => {
      const newUserDetails = await request.clone().json();

      // Create a new user instance
      const newUser = {
        name: newUserDetails.name,
        email: newUserDetails.email,
        emailVerified: false,
        image: null,
        // Use the time now for created and updated at
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        username: newUserDetails.username,
        displayUsername: newUserDetails.username,
        id: "GoodUserId",
      };

      // Add session token to cookie
      const newCookie: cookie.SetCookie = {
        name: "session_token",
        value: "VerySecureTokenGetRichQuick",
        domain: "localhost",
        path: "/",
        expires: addDays(new Date(), 7),
        httpOnly: true,
        secure: false,
      };

      // Return user information in body
      return HttpResponse.json(
        {
          token: "VerySecureTokenGetRichQuick",
          user: {
            name: newUser.name,
            email: newUser.email,
            emailVerified: false,
            image: null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            username: newUser.username,
            displayUsername: newUser.username,
            id: "GoodUserId",
          },
        },
        {
          headers: {
            // Set session cookie
            "set-cookie": cookie.stringifySetCookie(newCookie),
          },
        },
      );
    },
  ),

  // Sign in with email
  http.post<{ token: string }, EmailCredentials>(
    `${process.env.SERVER_URL}/api/auth/sign-in/email`,
    async ({ request }) => {
      const credentials = await request.clone().json();
      // Check user credential with mock user
      if (
        credentials.email !== "zach@example.com" ||
        credentials.password !== "SecurePw111"
      ) {
        return;
      }

      // Define new session cookie, renewed to expire in another 7 days from now
      const renewalCookie: cookie.SetCookie = {
        name: "session_token",
        value: "AnotherNewSecureToken",
        domain: "localhost",
        path: "/",
        expires: addDays(new Date(), 7),
        httpOnly: true,
        secure: false,
      };

      // Return the signed in mock user in response body
      return HttpResponse.json(
        {
          token: "AnotherNewSecureToken",
          user: {
            name: "Zach",
            email: "zach@example.com",
            emailVerified: false,
            image: null,
            // Assume this mock user created their account 18 days ago
            createdAt: subDays(new Date(), 18).toISOString(),
            updatedAt: subDays(new Date(), 18).toISOString(),
            username: "zachjoejl134",
            displayUsername: "zachjoejl134",
            id: "GoodUserId",
          },
        },
        {
          // Set the renewed cookie
          headers: {
            "set-cookie": cookie.stringifySetCookie(renewalCookie),
          },
        },
      );
    },
  ),

  // Sign in with username
  http.post<{ token: string }, UsernameCredentials>(
    `${process.env.SERVER_URL}/api/auth/sign-in/username`,
    async ({ request }) => {
      const credentials = await request.clone().json();

      if (
        credentials.username !== "zachjoejl134" ||
        credentials.password !== "SecurePw111"
      ) {
        return;
      }

      const renewalCookie: cookie.SetCookie = {
        name: "session_token",
        value: "YetAnotherSecureToken",
        domain: "localhost",
        path: "/",
        expires: addDays(new Date(), 7),
        httpOnly: true,
        secure: false,
      };

      return HttpResponse.json(
        {
          token: "YetAnotherSecureToken",
          user: {
            name: "Zach",
            email: "zach@example.com",
            emailVerified: false,
            image: null,
            createdAt: subDays(new Date(), 18).toISOString(),
            updatedAt: subDays(new Date(), 18).toISOString(),
            username: "zachjoejl134",
            displayUsername: "zachjoejl134",
            id: "GoodUserId",
          },
        },
        {
          headers: {
            "set-cookie": cookie.stringifySetCookie(renewalCookie),
          },
        },
      );
    },
  ),

  // Sign out
  http.post(`${process.env.SERVER_URL}/api/auth/sign-out`, async () => {
    // Clear all authentication-related cookies
    const clearSessionTokenCookie: cookie.SetCookie = {
      name: "session_token",
      value: "",
      maxAge: 0,
      path: "/",
      sameSite: "lax",
    };
    const clearSessionDataCookie: cookie.SetCookie = {
      name: "session_data",
      value: "",
      maxAge: 0,
      path: "/",
      sameSite: "lax",
    };
    const clearDontRememberCookie: cookie.SetCookie = {
      name: "dont_remember",
      value: "",
      maxAge: 0,
      path: "/",
      sameSite: "lax",
    };

    return HttpResponse.json(
      { success: true },
      {
        // Actually clear those defined cookies by setting them in headers
        headers: [
          ["set-cookie", cookie.stringifySetCookie(clearSessionTokenCookie)],
          ["set-cookie", cookie.stringifySetCookie(clearSessionDataCookie)],
          ["set-cookie", cookie.stringifySetCookie(clearDontRememberCookie)],
        ],
      },
    );
  }),
];
