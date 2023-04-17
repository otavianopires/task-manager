import { userOptions } from "@/lib/helpers";

export default function DashboardPage() {
  return (
    <>
      <h1>Dashboard</h1>
      <p>Welcome to the tasks dashboard</p>
    </>
  )
}

DashboardPage.auth = userOptions;