import { createFileRoute, Link } from '@tanstack/react-router'
import { Route as signInRoute } from './sign-in'

import AuthFormContainer from './components/AuthFormContainer'
import SignUpForm from './components/SignUpForm'

export const Route = createFileRoute('/(auth)/sign-up')({
  component: SignUp,
  notFoundComponent: () => <h1>Not Found! Geez just stop yelling</h1>,
})

function SignUp() {
  return (
    <AuthFormContainer>
      <h1 className="mb-6 text-center text-2xl font-bold md:text-3xl">
        Create An Account
      </h1>
      <SignUpForm className="w-full md:min-w-90" />
      <p className="mt-6 text-center">
        Already have an account?{' '}
        <Link className="hover:underline" to={signInRoute.to}>
          Sign In
        </Link>
      </p>
    </AuthFormContainer>
  )
}
