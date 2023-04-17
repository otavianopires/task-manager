import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Button from "./ui/Button";

export default function Profile() {
  const {data: session} = useSession();

  return (
    <div className="flex justify-between items-center gap-4">
      {session && (
        <>
          <Image
              src={session.user.image}
              alt={session.user.name}
              className="rounded-full w-[34px] h-[34px]"
              width={34}
              height={34}
            />
          <Button
            onClick={() => signOut()}
            size="rounded"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
          </Button>
        </>
      )}
      {!session && (
        <Button onClick={() => signIn()}>Sign In</Button>
      )}
    </div>
  )
}