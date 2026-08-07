import { renderTestRouter } from '#/tests/file-route-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import { screen, within } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import '@testing-library/jest-dom'

beforeEach(() => {
  renderTestRouter('/sign-up')
})

describe('Sign up form', () => {
  let signUpForm: HTMLFormElement
  let nameInput: HTMLInputElement
  let emailInput: HTMLInputElement
  let usernameInput: HTMLInputElement
  let passwordInput: HTMLInputElement
  let confirmPasswordInput: HTMLInputElement

  beforeEach(async () => {
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

  it('exists', () => {
    expect(signUpForm).toBeInTheDocument()
  })

  it('has a heading', () => {
    const heading = within(signUpForm).getByRole('heading', {
      name: /create(?: an)? account|sign up/i,
    })
    expect(heading).toBeInTheDocument()
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

describe('Sign in page redirect link', () => {
  let signInLink: HTMLAnchorElement
  beforeEach(async () => {
    signInLink = await screen.findByRole('link', { name: /sign in/i })
  })

  it('exists', () => {
    expect(signInLink).toBeInTheDocument()
  })

  it.skip('redirects user to the sign in form', async () => {
    const user = userEvent.setup()
    await user.click(signInLink)
    const signInForm = await screen.getByRole('form', { name: /sign in/i })
    expect(signInForm).toBeInTheDocument()
  })
})
