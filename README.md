# Task Manager

Task Manager is a web-based application that enables users to stay on top of their daily tasks.

Developed using Next.js, Tailwind, and Prisma for database management. With a fully-featured login system built with NextAuth.js, users can log in using their Google accounts for easy and secure access.

The application is designed with a role-based access control system, with default users only able to access the dashboard pages and view their tasks. Admin users, on the other hand, have access to the admin pages, where they can create new tasks and manage the system.

## Getting Started

Create an .env file with the following variables:

```
DATABASE_URL="mysql://johndoe:mypassword@localhost6:3306/mydb"
SHADOW_DATABASE_URL="mysql://johndoe:mypassword@localhost6:3306/mydb2"
GOOGLE_CLIENT_ID="123456.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOOGLE-123-456-789"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="secret"
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
