import { useState } from 'react'
import { Mail, Lock, Eye, EyeOff, LogIn, UserPlus, Globe } from 'lucide-react'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate login
    setTimeout(() => {
      setIsLoading(false)
      alert('Login credentials submitted!')
    }, 1500)
  }

  const handleGoogleSignIn = () => {
    alert('Google sign-in integration would go here')
  }

  return (
    <div className="w-full max-w-md slide-up">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-block mb-4">
          <div className="text-4xl font-bold logo-glow">
            <span className="text-accent">KREO</span>
          </div>
          <div className="text-xs text-secondary tracking-widest mt-1">CONTROL SYSTEM</div>
        </div>
        <h1 className="text-3xl font-bold text-accent mt-6 mb-2">Welcome back</h1>
        <p className="text-secondary">Sign back in to access the application</p>
      </div>

      {/* Main glass card */}
      <form onSubmit={handleLogin} className="glass-card p-8 mb-6">
        {/* Email field */}
        <div className="mb-5">
          <label className="block text-sm text-secondary mb-2 font-medium">Email</label>
          <div className="relative">
            <Mail className="absolute left-4 top-3.5 w-4 h-4 text-secondary pointer-events-none" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="glass-input w-full pl-10 transition-all duration-300"
              required
            />
          </div>
        </div>

        {/* Password field */}
        <div className="mb-5">
          <label className="block text-sm text-secondary mb-2 font-medium">Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-3.5 w-4 h-4 text-secondary pointer-events-none" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="glass-input w-full pl-10 pr-10 transition-all duration-300"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3.5 text-secondary hover:text-accent transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Remember me & Forgot password */}
        <div className="flex items-center justify-between mb-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="glass-checkbox"
            />
            <span className="text-sm text-secondary">Remember me</span>
          </label>
          <a href="#" className="glass-link text-sm font-medium">
            Forgot password?
          </a>
        </div>

        {/* Login button */}
        <button
          type="submit"
          disabled={isLoading}
          className="glass-button w-full mb-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              <LogIn className="w-4 h-4" />
              Sign In
            </>
          )}
        </button>

        {/* Divider */}
        <div className="relative mb-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/20" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gradient-to-r from-transparent via-black/30 to-transparent text-secondary">or</span>
          </div>
        </div>

        {/* Google Sign In */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="glass-button w-full flex items-center justify-center gap-2"
        >
          <Globe className="w-4 h-4" />
          Sign in with Google
        </button>
      </form>

      {/* Register link */}
      <div className="text-center mb-8">
        <p className="text-secondary">
          Don't have an account?{' '}
          <a href="#" className="glass-link font-semibold">
            Register
          </a>
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-center gap-4 text-xs text-muted">
        <a href="#" className="glass-link hover:text-secondary">
          Privacy policy
        </a>
        <span>•</span>
        <p>© 2026 Kreo</p>
      </div>
    </div>
  )
}
