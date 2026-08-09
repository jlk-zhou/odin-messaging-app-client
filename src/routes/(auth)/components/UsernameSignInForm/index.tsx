import type z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import * as _ from 'lodash-es'
import { Controller, useForm } from 'react-hook-form'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import { usernameSignInSchema } from './schema'
import PasswordField from '#/routes/components/PasswordField'

export default function usernameSignInForm() {
  const form = useForm<z.infer<typeof usernameSignInSchema>>({
    resolver: zodResolver(usernameSignInSchema),
    mode: 'onTouched',
  })

  function onSubmit(data: z.infer<typeof usernameSignInSchema>) {
    console.log(data)
  }

  return (
    <form
      aria-label={'Username Sign In Form'}
      className="flex flex-col items-center gap-5 h-fit"
      onSubmit={form.handleSubmit(onSubmit)}
    >
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
        name={'password'}
        control={form.control}
        render={({ field, fieldState }) => (
          <PasswordField
            className="w-full"
            fieldState={fieldState}
            {...field}
          />
        )}
      />
      <Button type="submit" variant="contained" className="w-fit">
        Sign In
      </Button>
    </form>
  )
}
