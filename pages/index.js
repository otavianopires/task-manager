import { userOptions } from "@/lib/helpers";

export default function HomePage() {
  return (
    <>
      <h1>Welcome to the Task Manager</h1>
      <p>Task Manager is a web-based application that enables users to stay on top of their daily tasks.</p>

      <p>Developed using Next.js, Tailwind, and Prisma for database management. With a fully-featured login system built with NextAuth.js, users can log in using their Google accounts for easy and secure access.</p>

      <p>The application is designed with a role-based access control system, with default users only able to access the dashboard pages and view their tasks. Admin users, on the other hand, have access to the admin pages, where they can create new tasks and manage the system.</p>
    </>
  )
}

HomePage.auth = userOptions;