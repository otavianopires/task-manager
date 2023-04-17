import { userOptions } from "@/lib/helpers";

export default function HomePage() {
  return (
    <>
      <h1>Welcome to the Task Manager App</h1>
      <p>Welcome to the tasks dashboard</p>
    </>
  )
}

HomePage.auth = userOptions;