# NextJS/FaunaDB with Magic Authentication

[Documentation forthcoming!]

## Deploy your own

Deploy the example using [Vercel Now](https://vercel.com/docs/now-cli#commands/overview/basic-usage):

[![Deploy with Vercel Now](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fmagiclabs%2Fexample-nextjs-faunadb-todomvc&env=NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY,MAGIC_SECRET_KEY,FAUNADB_SECRET_KEY)

## Configuration

Login to the [Magic Dashboard](https://dashboard.magic.link/) and get the keys of your application

![Magic Dashboard](https://gblobscdn.gitbook.com/assets%2F-M1XNjqusnKyXZc7t7qQ%2F-M3HsSftOAghkNs-ttU3%2F-M3HsllfdwdDmeFXBK3U%2Fdashboard-pk.png?alt=media&token=4d6e7543-ae20-4355-951c-c6421b8f1b5f)

Next, copy the `.env.local.example` file in this directory to .env.local (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Then set each variable on `.env.local`:

- `NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY` should look like `pk_test_abc` or `pk_live_ABC`
- `MAGIC_SECRET_KEY` should look like `sk_test_ABC` or `sk_live_ABC`
- `FAUNADB_SECRET_KEY` should look like `fnRB4Ld...`

To deploy on Vercel, you need to set up the environment variables with the [Environment Variables UI](https://vercel.com/blog/environment-variables-ui) using the [Vercel CLI](https://vercel.com/download) ([Documentation](https://vercel.com/docs/cli#commands/env)).

Install [Vercel CLI](https://vercel.com/download), log in to your account from the CLI, link your project and run the following command to add the `NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY`, `MAGIC_SECRET_KEY` and `FAUNADB_SECRET_KEY` environment variables.

```bash
vercel env add NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY [your public Magic API key]
```
