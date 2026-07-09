import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/shared/ui/Button'
import { TextField } from '@/shared/ui/TextField'

import { useAuth } from '../hooks/useAuth'
import { loginSchema, type LoginFormValue } from '../login-schema'
import { PasswordField } from './PasswordField'

export const LoginForm = () => {
  const { login } = useAuth()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValue>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginFormValue) => {
    try {
      await login(data)
    } catch (error) {
      setError('root', { message: 'Something went wrong. Please try again.' })
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <TextField
        label="Email address"
        type="email"
        placeholder="name@example.com"
        autoComplete="email"
        error={errors.email?.message}
        {...register('email')}
      />
      <PasswordField
        label="Password"
        placeholder="Enter your password"
        autoComplete="current-password"
        error={errors.password?.message}
        {...register('password')}
      />

      {errors.root && (
        <p role="alert" className="text-sm text-loss">
          {errors.root.message}
        </p>
      )}

      <Button type="submit" loading={isSubmitting} className="w-full">
        {isSubmitting ? 'Signing in…' : 'Sign in'}
      </Button>
    </form>
  )
}
