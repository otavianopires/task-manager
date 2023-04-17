import { adminOptions } from "@/lib/helpers";
import { useSession } from "next-auth/react";

export default function AdminPage() {
  const { data: session } = useSession();
  return (
    <>
      <h1>Admin Page</h1>
      <p>Welcome to the tasks Admin</p>
    </>
  )
}

AdminPage.auth = adminOptions;