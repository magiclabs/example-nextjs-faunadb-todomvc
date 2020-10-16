import Head from 'next/head'
import { useUser } from '../lib/hooks'
import Header from './header'

export default function Layout({ children }) {
  const { user } = useUser()

  return (<>
    <Head>
      <title>Magic</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Header />

    <main>
      <div className="container">{children}</div>
      {user && <div className="current-user">
        <span>{user.email}</span>
        <a href="/api/logout">Logout</a>
      </div>}
    </main>

    <footer>
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by <img src="/vercel.svg" alt="Vercel Logo" />
      </a>
    </footer>

    <style jsx global>{`
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        color: #333;
        font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
      }

      .container {
        max-width: 550px;
        margin: 0 auto;
        border-radius: 10px;
        box-shadow: 0 0 25px rgba(0, 0, 0, 0.15);
        overflow: hidden;
      }

      .current-user {
        display: flex;
        justify-content: flex-end;
        max-width: 550px;
        margin: 0 auto;
        margin-top: 15px;
      }

      .current-user > span {
        font-weight: 600;
        margin-right: 10px;
      }

      .current-user > a {
        margin-right: 25px;
      }

      footer {
        width: 100%;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 75px;
      }
    `}</style>
  </>)
}
