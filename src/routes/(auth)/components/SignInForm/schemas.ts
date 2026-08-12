import * as z from "zod";

const emailError = "must be in correct format.";
const maxLengthError = (max: number) => `must be under ${max} characters.`;
const minLengthError = (min: number) => `must be more than ${min} characters.`;
const stringError = "Please enter a ";

export const emailSignInSchema = z.object({
  email: z
    .email(`Email ${emailError}`)
    .min(5, `Email ${minLengthError(5)}`)
    .max(50, `Email ${maxLengthError(50)}`)
    .trim(),
  password: z
    .string(`${stringError} password.`)
    .min(8, `Password ${minLengthError(8)}`)
    .max(32, `Password ${maxLengthError(32)}`),
});

export const usernameSignInSchema = z.object({
  username: z
    .string(`${stringError} username.`)
    .min(5, `Username ${minLengthError(5)}`)
    .max(50, `Username ${maxLengthError(50)}`)
    .trim(),
  password: z
    .string(`${stringError} password.`)
    .min(8, `Password ${minLengthError(8)}`)
    .max(32, `Password ${maxLengthError(32)}`),
});
