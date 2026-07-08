import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

import { TextField, type TextFieldProps } from '@/components/ui/TextField'

type PasswordFieldProps = Omit<TextFieldProps, 'type' | 'trailing'>

export const PasswordField = (props: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const Icon = showPassword ? EyeOff : Eye

  return (
    <TextField
      {...props}
      type={showPassword ? 'text' : 'password'}
      trailing={
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          className="cursor-pointer rounded-lg p-2 text-ink-faint transition-colors hover:text-ink-soft focus-visible:outline-2 focus-visible:outline-primary"
        >
          <Icon aria-hidden className="size-4" />
        </button>
      }
    />
  )
}
