import { SessionProvider } from "next-auth/react"
import Auth from '@/components/Auth';
import '@/styles/globals.scss'
import Layout from "@/components/Layout";

export default function App({ Component, pageProps: {session, ...pageProps} }) {
  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth options={Component.auth}>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Layout><Component {...pageProps} /></Layout>
      )}
    </SessionProvider>
  )
}
