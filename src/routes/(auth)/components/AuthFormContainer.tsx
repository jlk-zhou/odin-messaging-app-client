import React from 'react'

import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'

interface AuthFormContainerProps {
  children: React.ReactNode
}

export default function AuthFormContainer({
  children,
}: AuthFormContainerProps) {
  return (
    <Container className="flex min-h-screen max-w-100 flex-col px-3 py-15 md:max-w-170 md:items-center md:justify-center md:py-0">
      <Paper
        className="my-10 contents min-h-150 md:block md:p-12"
        elevation={3}
      >
        {children}
      </Paper>
    </Container>
  )
}
