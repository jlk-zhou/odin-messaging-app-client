## Better Auth Basic Client Template

Authentication client built with Better Auth and TanStack Router.

## Features

This client features user interfaces that support fundamental authentication functions such as sign up, sign in and sign out. User may choose to sign in with email or username. The client also has client-side input verification on all forms and is able to display errors from the authentication server.

## To run on your machine

Please follow these instructions.

### Prerequisites

- A running local [authentication server](https://github.com/jlk-zhou/better-auth-basic-server-template) with all its prerequisites satisfied

- pnpm

### Steps

1. Clone this repository and navigate into it.

```
git clone git@github.com:jlk-zhou/better-auth-basic-server-template.git
cd client
```

2. Install all dependencies.

```
npm install
```

3. Create a `.env` file and configure your server URL, as per `.env.example`, if you wish. Default is

```
http://localhost:3000
```

4. To run the client in development mode, run

```
npm run dev
```

and modify the source code and save changes to test hot module replacement. Otherwise, to preview the client in production mode, first build the client with

```
npm run build
```

Then open preview with

```
npm run preview
```

5. Open your browser and visit

```
http://localhost:5173
```

to play with it!

## Dependencies

Key packages that are used to build this client include:

- Framework: TanStack Router with React

- Auth: Better Auth

- UI and styling: Material UI, Tailwind CSS

- Form and client-side verification: React Hook Form, Zod

- Type safety: Typescript

- Unit and integration testing: Vitest, React Testing Library, JSDom

- Linter: ESLint, Prettier

- Utilities: cookie, date-fns, lodash
