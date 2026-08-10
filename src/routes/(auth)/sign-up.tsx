import { createFileRoute, Link } from '@tanstack/react-router'

import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'

import { Route as signInRoute } from './sign-in'
import SignUpForm from './components/SignUpForm'

export const Route = createFileRoute('/(auth)/sign-up')({
  component: SignUp,
  notFoundComponent: () => <h1>Not Found! Geez just stop yelling</h1>,
})

function SignUp() {
  return (
    <>
      <Container className="min-h-screen max-w-100 md:max-w-170 flex py-15 md:py-0 flex-col justify-center items-center">
        <Paper className="contents md:block h-fit my-10 md:p-15" elevation={3}>
          <h1 className="text-2xl md:text-3xl mb-6 text-center font-bold">
            Create An Account
          </h1>
          <SignUpForm className="w-full md:min-w-90" />
          <p className="mt-6 text-center">
            Already have an account?{' '}
            <Link className="hover:underline" to={signInRoute.to}>
              Sign In
            </Link>
          </p>
        </Paper>
      </Container>
    </>
  )
}
