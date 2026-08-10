import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Route as signUpRoute } from './sign-up'

import * as _ from 'lodash-es'

import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'

import AuthFormContainer from './components/AuthFormContainer'
import EmailSignInForm from './components/EmailSignInForm'
import UsernameSignInForm from './components/UsernameSignInForm'
import TabPanel from './components/TabPanel'

export const Route = createFileRoute('/(auth)/sign-in')({
  component: SignIn,
  notFoundComponent: () => <h1>Not Found! Geez just stop yelling</h1>,
})

function SignIn() {
  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <AuthFormContainer>
      <h1 className="mb-6 text-center text-2xl font-bold md:text-3xl">
        Sign In
      </h1>
      <Tabs
        value={value}
        onChange={handleChange}
        centered
        className="w-full py-3"
      >
        <Tab label="With Email" />
        <Tab label="With Username" />
      </Tabs>
      <TabPanel className="w-full" value={value} index={0}>
        <EmailSignInForm className="w-full md:min-w-90" />
      </TabPanel>
      <TabPanel className="w-full" value={value} index={1}>
        <UsernameSignInForm className="w-full md:min-w-90" />
      </TabPanel>
      <p className="mt-12 text-center">
        Don't have an account?{' '}
        <Link className="hover:underline" to={signUpRoute.to}>
          Sign Up
        </Link>
      </p>
    </AuthFormContainer>
  )
}
