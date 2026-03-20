import { atom } from 'jotai'

const SESSION_KEY = 'tpv-auth'

export const authedAtom = atom(sessionStorage.getItem(SESSION_KEY) === 'true')
export const passwordValueAtom = atom('')
export const passwordErrorAtom = atom(false)
export const shakingAtom = atom(false)

export const submitPasswordAtom = atom(null, async (get, set) => {
  const PASS_HASH = 'e9f4b2c98603e3be520886a81c0aaf2cc7e506443a4421330e3974eb03b8b7a1'
  const value = get(passwordValueAtom).trim()
  const data = new TextEncoder().encode(value)
  const hashBuf = await crypto.subtle.digest('SHA-256', data)
  const hash = Array.from(new Uint8Array(hashBuf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')

  if (hash === PASS_HASH) {
    sessionStorage.setItem(SESSION_KEY, 'true')
    set(authedAtom, true)
  } else {
    set(passwordErrorAtom, true)
    set(shakingAtom, true)
    set(passwordValueAtom, '')
    setTimeout(() => set(shakingAtom, false), 500)
  }
})
