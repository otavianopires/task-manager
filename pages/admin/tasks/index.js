import { adminOptions, formatDateTime } from "@/lib/helpers";
import { prisma } from "@/server/db";
import Link from "next/link";

export default function TasksPage({tasks}) {
  return (
    <div className="">
      <h1 className="">Tasks</h1>
      <div className='mt-8'>
        {tasks.map(task => (
          <article key={task.id}>
            <Link href={`tasks/${task.id}`} className="bg-surface hover:bg-accentSurface hover:no-underline py-4 px-6 my-6 rounded-xl block">
              <h4 className="text-secondary font-bold">{task.title}</h4>
              <time>{formatDateTime(task.startDate)}</time>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}

TasksPage.auth = adminOptions;

export async function getStaticProps() {
  // Get all tasks ordered by startDate.
  let tasks = await prisma.task.findMany({
    orderBy: {
      startDate: 'asc'
    }
  });

  // Parse and stringify prisma response, so the object can be iterable.
  tasks = JSON.parse(JSON.stringify(tasks));

  return {
    props: {
      tasks
    },
    revalidate: 60
  }
}
