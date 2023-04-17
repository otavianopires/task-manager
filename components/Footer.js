import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="border-t-2 border-solid border-surface py-6 w-full max-w-2xl mx-auto flex justify-between flex-col md:flex-row gap-2">
          <p className="mb-0">Built with Next.js, NextAuth.js, Prisma, and Tailwind CSS.</p>
          <Link href="https://www.otavianopires.com" target="_blank" className="font-bold">otavianopires.com</Link>
        </div>
      </div>
    </footer>
  )
}