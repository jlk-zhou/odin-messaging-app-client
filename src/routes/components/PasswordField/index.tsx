import { useState } from 'react'

import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

export default function PasswordField({ confirming = false }) {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault
  }
  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault
  }

  const label = confirming ? 'Confirm Password' : 'Password'
  const id = confirming ? 'confirm-password' : 'password'
  const name = confirming ? 'confirmPassword' : 'password'

  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor={id} required>
        {label}
      </InputLabel>
      <OutlinedInput
        id={id}
        name={name}
        type={showPassword ? 'text' : 'password'}
        label={`${label} *`}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={showPassword ? 'hide password' : 'show password'}
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              onMouseUp={handleMouseUpPassword}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  )
}
