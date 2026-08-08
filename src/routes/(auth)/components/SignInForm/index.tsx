import * as _ from 'lodash-es'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import PasswordField from '#/routes/components/PasswordField'

interface SignInFormProps {
  mode: 'email' | 'username'
}

export default function SignInForm({ mode }: SignInFormProps) {
  return (
    <form
      aria-label={`${_.capitalize(mode)} Sign In Form`}
      className="flex flex-col items-center gap-5 h-fit"
    >
      {mode === 'email' ? (
        <>
          <TextField
            required
            type="email"
            label="Email"
            name="email"
            className="w-full"
          />
        </>
      ) : (
        <>
          <TextField
            required
            type="text"
            label="Username"
            name="username"
            className="w-full"
          />
        </>
      )}
      <PasswordField className="w-full" />
      <Button type="submit" variant="contained" className="w-fit">
        Sign In
      </Button>
    </form>
  )
}
