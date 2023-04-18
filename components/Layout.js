import { Roboto, Roboto_Slab } from 'next/font/google'
import Footer from "./Footer";
import Header from './Header';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { applyThemeClassname, isAdmin, isAdminPage } from '@/lib/helpers';
import Loading from './ui/Loading';

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['400', '700']
})
const roboto_slab = Roboto_Slab({
  subsets: ['latin'],
  variable: '--font-roboto-slab',
  weight: ['400', '700']
})

export default function Layout({ children, options }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    document.body.classList.add(
      roboto.variable,
      roboto_slab.variable,
    );
    if (status === "authenticated" && session.hasOwnProperty('user') ) {
      if (isAdminPage(router.pathname) && !isAdmin(session.user.role)) {
        router.push("/dashboard");
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    applyThemeClassname(router.pathname);
  }, [router.pathname]);

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <div id="site">
      <Header
        currentPage={router.pathname}
        role={options && status === "authenticated" && session.hasOwnProperty('user') ? options.role : false}
      />
      <main className="container py-10 md:py-16">{children}</main>
      <Footer />
    </div>
  )
}
