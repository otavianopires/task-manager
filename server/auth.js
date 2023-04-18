
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "./db"

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session }) {
      const dbUser = await prisma.user.findFirst({
        where: {
          email: session.email,
        },
      })

      if (session) {
        session.user.id = dbUser.id
        session.user.name = dbUser.name
        session.user.email = dbUser.email
        session.user.image = dbUser.image
        session.user.role = dbUser.role
      }

      return session
    },
  }
}