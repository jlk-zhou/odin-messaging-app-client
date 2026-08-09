import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import '@testing-library/jest-dom'

import UsernameSignInComponent from '.'

describe('Username sign in form', () => {
  let usernameSignInForm: HTMLFormElement
  let usernameInput: HTMLInputElement
  let passwordInput: HTMLInputElement

  beforeEach(async () => {
    render(<UsernameSignInComponent />)
    usernameSignInForm = await screen.findByRole('form', {
      name: /username sign(?:\s|-)in form/i,
    })
    usernameInput = within(usernameSignInForm).getByLabelText(/^username/i, {
      selector: 'input',
    })
    passwordInput = within(usernameSignInForm).getByLabelText(/^password/i, {
      selector: 'input',
    })
  })

  it('produces the correct data shape', async () => {
    const user = userEvent.setup()

    await user.type(usernameInput, 'user2456')
    await user.type(passwordInput, 'VeryStrongPw123!')

    expect(usernameSignInForm).toHaveFormValues({
      username: 'user2456',
      password: 'VeryStrongPw123!',
    })
  })

  describe('Username Input', () => {
    it('exists', () => {
      expect(usernameInput).toBeInTheDocument()
    })

    it('is of type text', () => {
      expect(usernameInput).toHaveAttribute('type', 'text')
    })

    it('allows entering input value', async () => {
      const user = userEvent.setup()
      await user.click(usernameInput)
      expect(usernameInput).toHaveFocus()
      await user.keyboard('myusername')
      expect(usernameInput).toHaveValue('myusername')
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
})
