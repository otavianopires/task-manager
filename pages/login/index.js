import Layout from "@/components/Layout";
import Button from "@/components/ui/Button";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function LoginPage() {
  const { data: session } = useSession();
  const [googleLoginLoading, setGoogleLoginLoading] = useState(false);
  return (
    <>
      <h1 className="my-6 font-bold text-2xl text-center">Login</h1>
      <div className="text-center">
        {!session && (
          <>
          <p>Sign in with:</p>
          <Button
            onClick={() => {
                setGoogleLoginLoading(true)
                signIn("google", {
                  callbackUrl: '/dashboard'
                })
              }
            }
          >
            {googleLoginLoading ? 'Please wait...' : 'Google'}
          </Button>
          </>
        )}
        {session && (
          <>
            <Image
              src={session.user.image}
              alt={session.user.name}
              className="rounded-full w-16 h-16 mx-auto mb-6"
              width={64}
              height={64}
            />
            <h2>Welcome <b>{session.user.name}</b>!</h2>
            <p>Signed in as {session.user.email}</p>
            <p>Role: {session.user.role}</p>
          </>
        )}
      </div>
    </>
  )
}
