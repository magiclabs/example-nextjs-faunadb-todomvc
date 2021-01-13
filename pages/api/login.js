import { createSession } from '../../lib/auth-cookies'
import { createHandlers } from '../../lib/rest-utils'
import { UserModel } from '../../lib/models/user-model'
import { Magic } from '@magic-sdk/admin';

const handlers = {
  POST: async (req, res) => {
    /* Step 4.2: Validate the user's DID token */
    const magic = new Magic(process.env.MAGIC_SECRET_KEY)
    const didToken = magic.utils.parseAuthorizationHeader(req.headers.authorization)
    magic.token.validate(didToken);
    const { email, issuer } = await magic.users.getMetadataByToken(didToken)

    /* Step 4.3: Get or create a user's entity in FaunaDB */
    const userModel = new UserModel()
    // We auto-detect signups if `getUserByEmail` resolves to `undefined`
    const user = await userModel.getUserByEmail(email) ?? await userModel.createUser(email);
    const token = await userModel.obtainFaunaDBToken(user);
    // Once we have the user's verified information, we can create
    // a session cookie! As this is not the primary topic of our tutorial
    // today, we encourage you to explore the implementation of
    // `createSession` on-your-own to learn more!
    // await createSession(res, { ... })
    await createSession(res, { token, email, issuer })
    
    res.status(200).send({ done: true })
  },
}

export default function login(req, res) {
  const handler = createHandlers(handlers);
  return handler(req, res);
}
