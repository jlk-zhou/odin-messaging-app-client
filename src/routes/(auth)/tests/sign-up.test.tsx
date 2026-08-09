import { renderTestRouter } from '#/tests/file-route-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import '@testing-library/jest-dom'

describe('Sign up page', () => {
  beforeEach(() => {
    renderTestRouter('/sign-up')
  })

  it('has a heading', () => {
    const heading = screen.findByRole('heading', {
      name: /create(?: an)? account|sign up/i,
    })
    expect(heading).toBeInTheDocument()
  })

  describe('Sign in page redirect link', () => {
    let signInLink: HTMLAnchorElement
    beforeEach(async () => {
      signInLink = await screen.findByRole('link', { name: /sign in/i })
    })

    it('exists', () => {
      expect(signInLink).toBeInTheDocument()
    })

    it('redirects user to the sign in form', async () => {
      const user = userEvent.setup()
      await user.click(signInLink)
      const signInForm = await screen.getByRole('form', { name: /sign in/i })
      expect(signInForm).toBeInTheDocument()
    })
  })
})
