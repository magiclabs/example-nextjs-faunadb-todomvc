import { serialize, parse } from 'cookie'
import { encrypt, decrypt } from './iron'

const TOKEN_NAME = 'session'
const MAX_AGE = 60 * 60 * 8 // 8 hours

function parseCookies(req) {
  // For API Routes we don't need to parse the cookies.
  if (req.cookies) return req.cookies

  // For pages we do need to parse the cookies.
  const cookie = req.headers?.cookie
  return parse(cookie || '')
}

export async function createSession(res, data) {
  const encryptedToken = await encrypt(data)

  const cookie = serialize(TOKEN_NAME, encryptedToken, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
  })

  res.setHeader('Set-Cookie', cookie)
}

export async function getSession(req) {
  const cookies = parseCookies(req)
  return decrypt(cookies?.[TOKEN_NAME]);
}

export function removeSession(res) {
  const cookie = serialize(TOKEN_NAME, '', {
    maxAge: -1,
    path: '/',
  })

  res.setHeader('Set-Cookie', cookie)
}
