import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import SignUpFormComponent from '.'

import '@testing-library/jest-dom'

describe('Sign up form', () => {
  let signUpForm: HTMLFormElement
  let nameInput: HTMLInputElement
  let emailInput: HTMLInputElement
  let usernameInput: HTMLInputElement
  let passwordInput: HTMLInputElement
  let confirmPasswordInput: HTMLInputElement

  beforeEach(async () => {
    render(<SignUpFormComponent />)
    signUpForm = await screen.findByRole('form', {
      name: /sign up form/i,
    })
    nameInput = within(signUpForm).getByLabelText(/^name/i)
    emailInput = within(signUpForm).getByLabelText(/^email/i)
    usernameInput = within(signUpForm).getByLabelText(/^username/i)
    passwordInput = within(signUpForm).getByLabelText(/^password/i)
    confirmPasswordInput =
      within(signUpForm).getByLabelText(/^confirm password/i)
  })

  it('renders', () => {
    expect(signUpForm).toBeInTheDocument()
  })

  it('produces the correct data shape', async () => {
    const user = userEvent.setup()

    await user.type(nameInput, 'Jane')
    await user.type(emailInput, 'jane@example.com')
    await user.type(usernameInput, 'jane123')
    await user.type(passwordInput, 'SuperStrongPw123!')
    await user.type(confirmPasswordInput, 'SuperStrongPw123!')

    expect(signUpForm).toHaveFormValues({
      name: 'Jane',
      email: 'jane@example.com',
      username: 'jane123',
      password: 'SuperStrongPw123!',
      confirmPassword: 'SuperStrongPw123!',
    })
  })

  describe('Name input', () => {
    it('exists', () => {
      expect(nameInput).toBeInTheDocument()
    })

    it('is of text type', () => {
      expect(nameInput).toHaveAttribute('type', 'text')
    })

    it('allows entering input value', async () => {
      const user = userEvent.setup()
      await user.click(nameInput)
      expect(nameInput).toHaveFocus()
      await user.keyboard('Jessie Black')
      expect(nameInput).toHaveValue('Jessie Black')
    })

    it('has browser input validation', () => {
      expect(nameInput).toHaveAttribute(
        'minlength',
        expect.toSatisfy((val: string) => Number(val) >= 0),
      )
      expect(nameInput).toHaveAttribute(
        'maxlength',
        expect.toSatisfy((val: string) => Number(val) <= 50),
      )
    })
  })

  describe('Email input', () => {
    it('exists', () => {
      expect(emailInput).toBeInTheDocument()
    })

    it('is of email type', () => {
      expect(emailInput).toHaveAttribute('type', 'email')
    })

    it('allows entering input value', async () => {
      const user = userEvent.setup()
      await user.click(emailInput)
      expect(emailInput).toHaveFocus()
      await user.keyboard('jessie@example.com')
      expect(emailInput).toHaveValue('jessie@example.com')
    })

    it('has browser input validation', () => {
      expect(emailInput).toHaveAttribute(
        'minlength',
        expect.toSatisfy((val: string) => Number(val) >= 0),
      )
      expect(emailInput).toHaveAttribute(
        'maxlength',
        expect.toSatisfy((val: string) => Number(val) <= 50),
      )
    })
  })

  describe('Username input', () => {
    it('exists', () => {
      expect(usernameInput).toBeInTheDocument()
    })

    it('is of text type', () => {
      expect(usernameInput).toHaveAttribute('type', 'text')
    })

    it('allows entering input value', async () => {
      const user = userEvent.setup()
      await user.click(usernameInput)
      expect(usernameInput).toHaveFocus()
      await user.keyboard('testing123')
      expect(usernameInput).toHaveValue('testing123')
    })

    it('has browser input validation', () => {
      expect(usernameInput).toHaveAttribute(
        'minlength',
        expect.toSatisfy((val: string) => Number(val) >= 0),
      )
      expect(usernameInput).toHaveAttribute(
        'maxlength',
        expect.toSatisfy((val: string) => Number(val) <= 50),
      )
    })
  })

  describe('Password input', () => {
    it('exists', () => {
      expect(passwordInput).toBeInTheDocument()
    })
  })

  describe('Confirm password input', () => {
    it('exists', () => {
      expect(confirmPasswordInput).toBeInTheDocument()
    })
  })

  describe('Submit button', () => {
    let submitButton: HTMLButtonElement
    beforeEach(async () => {
      submitButton = await screen.findByRole('button', { name: /sign up/i })
    })

    it('exists', () => {
      expect(submitButton).toBeInTheDocument()
    })
  })
})
