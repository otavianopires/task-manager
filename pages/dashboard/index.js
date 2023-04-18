import { userOptions } from "@/lib/helpers";
import { prisma } from "@/server/db";
import Link from "next/link";

export default function DashboardPage({tasks}) {
  console.log(tasks);
  return (
    <>
      <h1>Dashboard</h1>
      <p>Welcome to the tasks dashboard</p>

      <h2>Latest tasks</h2>
      <ul className=" list-inside list-disc">
        {tasks.map((task, index) => (
          <li key={task.id}><Link href={`dashboard/tasks/${task.id}`}>{task.title}</Link></li>
        ))}
      </ul>
    </>
  )
}

DashboardPage.auth = userOptions;

export async function getStaticProps() {
  let tasks = await prisma.task.findMany({
    orderBy: {
      startDate: 'desc'
    },
    take: 3
  });

  tasks = JSON.parse(JSON.stringify(tasks));

  return {
    props: {
      tasks: tasks
    },
    revalidate: 60
  }
}
