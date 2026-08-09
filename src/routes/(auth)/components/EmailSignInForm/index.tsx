import type z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import * as _ from 'lodash-es'
import { Controller, useForm } from 'react-hook-form'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import { emailSignInSchema } from './schema'
import PasswordField from '#/routes/components/PasswordField'

export default function EmailSignInForm() {
  const form = useForm<z.infer<typeof emailSignInSchema>>({
    resolver: zodResolver(emailSignInSchema),
    mode: 'onTouched',
  })

  function onSubmit(data: z.infer<typeof emailSignInSchema>) {
    console.log(data)
  }

  return (
    <form
      aria-label={'Email Sign In Form'}
      className="flex flex-col items-center gap-5 h-fit"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Controller
        name={'email'}
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
                maxLength: 50,
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
