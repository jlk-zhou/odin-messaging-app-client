import { useForm, Controller } from 'react-hook-form'
import type * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import PasswordField from '#/routes/components/PasswordField'
import { signUpFormSchema } from './schema'

export default function SignUpForm() {
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    mode: 'onTouched',
  })

  function onSubmit(data: z.infer<typeof signUpFormSchema>) {
    console.log(data)
  }

  return (
    <form
      aria-label="Sign Up Form"
      className="flex flex-col items-center gap-5 w-100 h-fit"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            required
            type="text"
            label="Name"
            className="w-full"
            error={fieldState.invalid}
            helperText={fieldState.invalid && fieldState.error?.message}
            data-invalid={fieldState.invalid}
            slotProps={{
              htmlInput: {
                minLength: 3,
                maxLength: 30,
                ariaInvalid: fieldState.invalid,
              },
            }}
          />
        )}
      />
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            required
            type="email"
            label="Email"
            name="email"
            className="w-full"
            error={fieldState.invalid}
            helperText={fieldState.invalid && fieldState.error?.message}
            data-invalid={fieldState.invalid}
            slotProps={{
              htmlInput: {
                minLength: 5,
                maxLength: 40,
                ariaInvalid: fieldState.invalid,
              },
            }}
          />
        )}
      />
      <Controller
        name="username"
        control={form.control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            required
            type="text"
            label="Username"
            name="username"
            className="w-full"
            data-invalid={fieldState.invalid}
            error={fieldState.invalid}
            helperText={fieldState.invalid && fieldState.error?.message}
            slotProps={{
              htmlInput: {
                minLength: 3,
                maxLength: 30,
                ariaInvalid: fieldState.invalid,
              },
            }}
          />
        )}
      />
      <Controller
        name="password"
        control={form.control}
        render={({ field, fieldState }) => (
          <PasswordField
            className="w-full"
            fieldState={fieldState}
            {...field}
          />
        )}
      />
      <Controller
        name="confirmPassword"
        control={form.control}
        render={({ field, fieldState }) => (
          <PasswordField
            className="w-full"
            confirming={true}
            fieldState={fieldState}
            {...field}
          />
        )}
      />
      <Button type="submit" variant="contained" className="w-fit">
        Sign Up
      </Button>
    </form>
  )
}
