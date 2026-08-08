import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Route as signUpRoute } from './sign-up'

import * as _ from 'lodash-es'

import Container from '@mui/material/Container'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'

import SignInForm from './components/SignInForm'
import TabPanel from './components/TabPanel'

export const Route = createFileRoute('/(auth)/sign-in')({
  component: SignIn,
})

function SignIn() {
  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <>
      <Container className="h-screen flex flex-col justify-center items-center">
        <div className="h-6/7">
          <h1 className="text-2xl my-3 text-center font-bold">Sign In</h1>
          <Tabs value={value} onChange={handleChange} className="py-3">
            <Tab label="Sign In with Email" />
            <Tab label="Sign In with Username" />
          </Tabs>
          <TabPanel value={value} index={0}>
            <SignInForm mode={'email'} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <SignInForm mode={'username'} />
          </TabPanel>
          <p className="my-4 text-center">
            Don't have an account? <Link to={signUpRoute.to}>Sign Up</Link>
          </p>
        </div>
      </Container>
    </>
  )
}
