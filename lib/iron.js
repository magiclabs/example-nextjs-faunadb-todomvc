import Iron from '@hapi/iron'

// Use an environment variable here instead of a hardcoded value for production
const ENCRYPTION_SECRET = 'this-is-a-secret-value-with-at-least-32-characters'

export async function encrypt(data) {
  return data && Iron.seal(data, ENCRYPTION_SECRET, Iron.defaults)
}

export async function decrypt(data) {
  return data && Iron.unseal(data, ENCRYPTION_SECRET, Iron.defaults)
}
