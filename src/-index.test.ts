import { screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import '@testing-library/jest-dom'
import { renderTestRouter } from './test/file-route-utils'

describe('index route', () => {
  beforeEach(() => {
    renderTestRouter('/')
  })
  it('renders header', async () => {
    const header = await screen.findByRole('heading', { name: /welcome/i })
    expect(header).toBeInTheDocument()
  })
})
