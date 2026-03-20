import { useRef, useEffect, useCallback } from 'react'
import { useAtomValue, useSetAtom } from 'jotai'
import { authedAtom, passwordValueAtom, passwordErrorAtom, shakingAtom, submitPasswordAtom } from '../../atoms/auth'

export function PasswordGate({ children }: { children: React.ReactNode }) {
  const authed = useAtomValue(authedAtom)
  const value = useAtomValue(passwordValueAtom)
  const error = useAtomValue(passwordErrorAtom)
  const shaking = useAtomValue(shakingAtom)
  const setValue = useSetAtom(passwordValueAtom)
  const setError = useSetAtom(passwordErrorAtom)
  const submit = useSetAtom(submitPasswordAtom)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!authed) inputRef.current?.focus()
  }, [authed])

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    submit()
  }, [submit])

  if (authed) return <>{children}</>

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center" style={{ backgroundColor: '#0a0b0f' }}>
      {/* Ambient glow effects */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(0, 238, 252, 0.3), transparent 70%)', top: '-10%', left: '20%' }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-15 blur-[100px]"
        style={{ background: 'radial-gradient(circle, rgba(255, 81, 250, 0.25), transparent 70%)', bottom: '5%', right: '15%' }}
      />

      <div
        className={`relative w-full max-w-md mx-4 rounded-2xl p-8 backdrop-blur-xl ${shaking ? 'animate-shake' : ''}`}
        style={{
          background: 'rgba(15, 17, 23, 0.85)',
          border: '1px solid rgba(0, 238, 252, 0.15)',
          boxShadow: '0 0 60px rgba(0, 238, 252, 0.06), 0 25px 50px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-8 right-8 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(0, 238, 252, 0.5), transparent)' }}
        />

        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4"
            style={{ background: 'rgba(0, 238, 252, 0.08)', border: '1px solid rgba(0, 238, 252, 0.15)' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(0, 238, 252, 0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h1
            className="text-2xl font-bold tracking-tight mb-1"
            style={{ color: 'rgba(255, 255, 255, 0.95)', fontFamily: 'var(--font-display, system-ui)' }}
          >
            TPV Explorer
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '14px' }}>
            Enter the access code to continue
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <input
              ref={inputRef}
              type="password"
              value={value}
              onChange={(e) => { setValue(e.target.value); setError(false) }}
              placeholder="Access code"
              autoComplete="off"
              className="w-full px-4 py-3.5 rounded-xl text-base outline-none transition-all duration-200 placeholder:text-white/20"
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: `1px solid ${error ? 'rgba(255, 81, 81, 0.5)' : 'rgba(255, 255, 255, 0.08)'}`,
                color: 'rgba(255, 255, 255, 0.9)',
                boxShadow: error ? '0 0 20px rgba(255, 81, 81, 0.1)' : 'none',
              }}
              onFocus={(e) => {
                if (!error) e.currentTarget.style.borderColor = 'rgba(0, 238, 252, 0.35)'
                e.currentTarget.style.boxShadow = error ? '0 0 20px rgba(255, 81, 81, 0.1)' : '0 0 20px rgba(0, 238, 252, 0.06)'
              }}
              onBlur={(e) => {
                if (!error) e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            />
            {error && (
              <p className="mt-2 text-sm" style={{ color: 'rgba(255, 81, 81, 0.8)' }}>
                Incorrect access code
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 238, 252, 0.15), rgba(0, 238, 252, 0.08))',
              border: '1px solid rgba(0, 238, 252, 0.25)',
              color: 'rgba(0, 238, 252, 0.9)',
              letterSpacing: '0.1em',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0, 238, 252, 0.25), rgba(0, 238, 252, 0.15))'
              e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 238, 252, 0.12)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0, 238, 252, 0.15), rgba(0, 238, 252, 0.08))'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            ENTER
          </button>
        </form>

        <p className="text-center mt-6" style={{ color: 'rgba(255, 255, 255, 0.2)', fontSize: '12px' }}>
          TrainingPeaks Virtual &middot; Internal Use Only
        </p>
      </div>
    </div>
  )
}
