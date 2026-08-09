import { useForm, Controller } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import PasswordField from '#/routes/components/PasswordField'

interface SignUpInputs {
  name: string
  email: string
  username: string
  password: string
  confirmPassword: string
}

export default function SignUpForm() {
  const { control, handleSubmit } = useForm<SignUpInputs>()

  const onSubmit: SubmitHandler<SignUpInputs> = (data) => console.log(data)

  return (
    <form
      aria-label="Sign Up Form"
      className="flex flex-col items-center gap-5 h-fit"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            slotProps={{ htmlInput: { minLength: 3, maxLength: 30 } }}
            required
            type="text"
            label="Name"
            className="w-full"
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            slotProps={{ htmlInput: { minLength: 5, maxLength: 40 } }}
            required
            type="email"
            label="Email"
            name="email"
            className="w-full"
          />
        )}
      />
      <Controller
        name="username"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            slotProps={{ htmlInput: { minLength: 3, maxLength: 30 } }}
            required
            type="text"
            label="Username"
            name="username"
            className="w-full"
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => <PasswordField {...field} />}
      />
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field }) => <PasswordField confirming={true} {...field} />}
      />
      <Button type="submit" variant="contained" className="w-fit">
        Sign Up
      </Button>
    </form>
  )
}
