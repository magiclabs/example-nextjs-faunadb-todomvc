import Link from 'next/link'
import { useUser } from '../lib/hooks'

export default function Header() {
  const user = useUser()

  return (
    <>
      <header>
        <h1>Todos</h1>
      </header>

      <style jsx>{`
        header {
          padding: 50px 0 35px 0;
        }

        header h1 {
          color: #e2dcff;
          font-size: 100px;
          font-weight: 100;
          text-transform: lowercase;
          text-align: center;
          margin: 0;
          line-height: 1;
        }
      `}</style>
    </>
  )
}
