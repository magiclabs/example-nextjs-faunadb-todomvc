import React, { useEffect, useState, useCallback } from 'react'
import { useUser, useIsMounted } from '../lib/hooks'
import { Magic } from 'magic-sdk'
import { useRouter } from 'next/router'
import Layout from '../components/layout'
import Button from '../components/button'

export default function Login() {
  const router = useRouter()
  const { user } = useUser()
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState(undefined)
  const isMounted = useIsMounted();

  useEffect(() => {
    // If a user is already logged in,
    // redirect to the home page automatically.
    if (user) router.push('/')
  }, [user]);

  const login = useCallback(async (email) => {
    if (isMounted() && errorMsg) setErrorMsg(undefined)

    try {
      const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY)
      const didToken = await magic.auth.loginWithMagicLink({ email })

      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${didToken}`
        },
        body: JSON.stringify({ email })
      })

      if (res.status === 200) {
        router.push('/')
      } else {
        throw new Error(await res.text())
      }
    } catch (err) {
      console.error('An unexpected error occurred:', err)
      if (isMounted()) setErrorMsg(err.message)
    }
  }, [errorMsg])

  const onSubmit = useCallback((e) => {
    e.preventDefault()
    if (isLoggingIn) return;
    setIsLoggingIn(true);
    login(e.currentTarget.email.value).then(() => setIsLoggingIn(false))
  }, [login, isLoggingIn])

  return (
    <Layout>
      <form onSubmit={onSubmit}>
        <h2>Log in</h2>

        <label htmlFor="email">Email<span aria-hidden={true}>*</span></label>
        <input type="email" name="email" required placeholder="hello@magic.link" />

        <Button disabled={isLoggingIn} type="submit">Sign Up / Login</Button>

        {errorMsg && <p className="error">{errorMsg}</p>}
      </form>

      <style jsx>{`
        form {
          padding: 3rem;
        }

        h2 {
          margin-top: 0;
          margin-bottom: 25px;
        }

        label {
          display: block;
          font-weight: 600;
        }

        input {
          display: block;
          padding: 8px;
          width: 100%;
          margin: 0.3rem 0 1rem;
          border: 1px solid #bdbdbd;
          border-radius: 4px;
          box-shadow: 0 0 0 3px transparent;
          transition: all 0.2s;
        }

        input:focus {
          outline: none;
          border-color: #6851ff;
          box-shadow: 0 0 0 3px #a796ff;
        }

        input:invalid {
          border-color: #d02f20;
          box-shadow: 0 0 0 3px #fba67f;
        }

        .error {
          color: brown;
          margin: 1rem 0 0;
        }
      `}</style>
    </Layout>
  )
}
