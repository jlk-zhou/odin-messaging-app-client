import { createFileRoute, Link } from '@tanstack/react-router'

import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'

import { Route as signInRoute } from './sign-in'
import PasswordField from '#/routes/components/PasswordField'

export const Route = createFileRoute('/(auth)/sign-up')({
  component: SignUp,
  notFoundComponent: () => <h1>Not Found! Geez just stop yelling</h1>,
})

function SignUp() {
  return (
    <>
      <Container className="h-screen flex flex-col justify-center items-center">
        <div className="h-6/7">
          <form
            aria-label="Sign Up Form"
            className="flex flex-col items-center gap-5 h-fit"
          >
            <h1 className="text-2xl my-3 text-center font-bold">
              Create An Account
            </h1>
            <TextField
              required
              type="text"
              label="Name"
              name="name"
              className="w-full"
            />
            <TextField
              required
              type="email"
              label="Email"
              name="email"
              className="w-full"
            />
            <TextField
              required
              type="text"
              label="Username"
              name="username"
              className="w-full"
            />
            <PasswordField />
            <PasswordField confirming={true} />
            <Button type="submit" variant="contained" className="w-fit">
              Sign Up
            </Button>
          </form>
          <p className="my-4">
            Already have an account? <Link to={signInRoute.to}>Sign In</Link>
          </p>
        </div>
      </Container>
    </>
  )
}
