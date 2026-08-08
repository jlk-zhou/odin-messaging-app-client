import { createFileRoute, Link } from '@tanstack/react-router'

import Container from '@mui/material/Container'

import { Route as signInRoute } from './sign-in'
import SignUpForm from './components/SignUpForm'

export const Route = createFileRoute('/(auth)/sign-up')({
  component: SignUp,
  notFoundComponent: () => <h1>Not Found! Geez just stop yelling</h1>,
})

function SignUp() {
  return (
    <>
      <Container className="h-screen flex flex-col justify-center items-center">
        <h1 className="text-2xl my-3 text-center font-bold">
          Create An Account
        </h1>
        <div className="h-6/7">
          <SignUpForm />
          <p className="my-4">
            Already have an account? <Link to={signInRoute.to}>Sign In</Link>
          </p>
        </div>
      </Container>
    </>
  )
}
