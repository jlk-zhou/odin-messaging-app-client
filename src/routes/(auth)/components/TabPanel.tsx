import * as React from 'react'
import Box from '@mui/material/Box'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
  className?: string
}

export default function TabPanel(props: TabPanelProps) {
  const { children, value, index, className = '', ...other } = props

  return (
    <div
      className={className}
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  )
}
