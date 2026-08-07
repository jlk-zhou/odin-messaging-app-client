import { createFileRoute, Link } from '@tanstack/react-router'
import React, { useState } from 'react'

import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import TextField from '@mui/material/TextField'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

import { Route as signInRoute } from './sign-in'

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
            <TextField required type="text" label="Name" className="w-full" />
            <TextField required type="email" label="Email" className="w-full" />
            <TextField
              required
              type="text"
              label="Username"
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

function PasswordField({ confirming = false }) {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault
  }
  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault
  }

  const label = confirming ? 'Confirm Password' : 'Password'
  const id = confirming ? 'confirm-password' : 'password'
  const name = confirming ? 'confirmPassword' : 'password'

  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor={id} required>
        {label}
      </InputLabel>
      <OutlinedInput
        id={id}
        name={name}
        type={showPassword ? 'text' : 'password'}
        label={`${label} *`}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={
                showPassword
                  ? `hide the password ${confirming && 'confirmation'}`
                  : `display the password ${confirming && 'confirmation'}`
              }
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              onMouseUp={handleMouseUpPassword}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  )
}
