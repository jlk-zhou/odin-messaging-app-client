import * as z from 'zod'
import * as _ from 'lodash-es'

const emailError = 'must be in correct format.'
const maxLengthError = (max: number) => `must be under ${max} characters.`
const minLengthError = (min: number) => `must be more than ${min} characters.`
const noLowerCaseError = 'must contain at least one lower case letter.'
const noNumberError = 'must contain at least one number.'
const noUpperCaseError = 'must contain at least one upper case letter.'
const stringError = 'Please enter a '

export const signUpFormSchema = z
  .object({
    name: z
      .string(`${stringError} name.`)
      .min(3, `Name ${minLengthError(3)}`)
      .max(30, `Name ${maxLengthError(30)}`)
      .trim(),
    email: z
      .email(`Email ${emailError}`)
      .min(5, `Email ${minLengthError(5)}`)
      .max(50, `Email ${maxLengthError(50)}`)
      .trim(),
    username: z
      .string(`${stringError} username.`)
      .min(3, `Username ${minLengthError(3)}`)
      .max(30, `Username ${maxLengthError(30)}`)
      .trim(),
    password: z
      .string(`${stringError} password.`)
      .min(8, `Password ${minLengthError(8)}`)
      .max(32, `Password ${maxLengthError(32)}`)
      .regex(/[a-z]/, `Password ${noLowerCaseError}`)
      .regex(/[A-Z]/, `Password ${noUpperCaseError}`)
      .regex(/[0-9]/, `Password ${noNumberError}`),
    confirmPassword: z
      .string('Please confirm your password.')
      .min(8, `Password confirmation ${minLengthError(8)}`)
      .max(32, `Password confirmation ${maxLengthError(32)}`),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword
    },
    {
      path: ['confirmPassword'],
      message: 'Passwords must match.',
    },
  )
