import { SessionProvider } from "next-auth/react"
import Auth from '@/components/Auth';
import '@/styles/globals.scss'

export default function App({ Component, pageProps: {session, ...pageProps} }) {
  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth options={Component.auth}>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  )
}
