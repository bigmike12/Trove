import { AuthProvider } from '@/features/auth/AuthProvider'

const App = () => {
  return (
    <AuthProvider>
      <div>App</div>
    </AuthProvider>
  )
}

export default App
