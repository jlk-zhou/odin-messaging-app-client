import * as _ from 'lodash-es'
import { Controller, useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import PasswordField from '#/routes/components/PasswordField'

interface SignInModes {
  mode: 'email' | 'username'
}

interface SignInInputs {
  email: string
  username: string
  password: string
}

export default function SignInForm({ mode }: SignInModes) {
  const { control, handleSubmit } = useForm<SignInInputs>()

  const onSubmit: SubmitHandler<SignInInputs> = (data) => console.log(data)

  return (
    <form
      aria-label={`${_.capitalize(mode as any)} Sign In Form`}
      className="flex flex-col items-center gap-5 h-fit"
      onSubmit={handleSubmit(onSubmit)}
    >
      {(mode as any) === 'email' ? (
        <Controller
          name={'email'}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              required
              type="email"
              label="Email"
              name="email"
              className="w-full"
            />
          )}
        />
      ) : (
        <Controller
          name={'email'}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              required
              type="text"
              label="Username"
              name="username"
              className="w-full"
            />
          )}
        />
      )}
      <Controller
        name={'password'}
        control={control}
        render={({ field }) => <PasswordField {...field} className="w-full" />}
      />
      <Button type="submit" variant="contained" className="w-fit">
        Sign In
      </Button>
    </form>
  )
}
