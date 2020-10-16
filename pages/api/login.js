import { magic } from '../../lib/magic'
import { createSession } from '../../lib/auth-cookies'
import { createHandlers } from '../../lib/rest-utils'
import { UserModel } from '../../lib/models/user-model'

const handlers = {
  POST: async (req, res) => {
    const didToken = magic.utils.parseAuthorizationHeader(req.headers.authorization)

    // This is where we validate the user's identity to authenticate them. This
    // method will throw if the user's DID token is invalid, expired, or
    // malformed.
    magic.token.validate(didToken)

    const { email, issuer } = await magic.users.getMetadataByToken(didToken)

    const userModel = new UserModel()

    // We auto-detect signups if `getUserByEmail` resolves to `undefined`
    const user = await userModel.getUserByEmail(email) ?? await userModel.createUser(email, issuer);
    const token = await userModel.obtainFaunaDBToken(user, issuer);

    console.log(token);

    await createSession(res, { token, email, issuer })

    res.status(200).send({ done: true })
  },
}

export default function login(req, res) {
  const handler = createHandlers(handlers);
  return handler(req, res);
}
