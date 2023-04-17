import { formatDate, userOptions } from "@/lib/helpers";
import { prisma } from "@/server/db";
import Link from "next/link";

export default function TasksPage({tasks}) {
  const TasksList = ({tasks}) => {
    return (
      <>
        {Object.keys(tasks).map((year, index) => {
          return (
            <section key={index} className="tasks-by-year">
              <h2 className="text-secondary">{year}</h2>
              <div className="ml-6 pl-6 border-l border-solid border-surface mb-10 flex-grow">
                <TasksListMonth tasksYear={tasks[year]} />
              </div>
            </section>
          );
        })}
      </>
    )
  }

  const TasksListMonth = ({tasksYear}) => {
    return (
      <>
        {Object.keys(tasksYear).map((month, index) => {
          return (
            <section key={month} className="tasks-by-month">
              <h3 className="font-bold">{tasksYear[month].month}</h3>
              {tasksYear[month].tasks.map(task => (
                <article key={task.id}>
                  <Link href={`tasks/${task.id}`} className="bg-surface hover:bg-accentSurface hover:no-underline py-4 px-6 my-6 rounded-xl block">
                    <h4 className="text-secondary font-bold">{task.title}</h4>
                    <time>{formatDate(task.startDate)}</time>
                  </Link>
                </article>
              ))}
            </section>
          );
        })}
      </>
    )
  }

  return (
    <div className="">
      <h1 className="">Tasks</h1>
      <div className='mt-8'>
        <TasksList tasks={tasks} />
      </div>
    </div>
  )
}

TasksPage.auth = userOptions;

export async function getStaticProps() {
  // Get all tasks ordered by startDate.
  let tasks = await prisma.task.findMany({
    orderBy: {
      startDate: 'asc'
    }
  });

  // Set initial tasks object.
  const tasksByYear = {};

  // Parse and stringify prisma response, so the object can be iterable.
  tasks = JSON.parse(JSON.stringify(tasks));

  // Add tasks to the tasksByYear organized by year and month.
  tasks.map(task => {
    const taskDate = new Date(task.startDate);
    const month    = taskDate.toLocaleString('default', { month: 'short' });

    if (!tasksByYear[`${taskDate.getFullYear()}`]) {
      tasksByYear[`${taskDate.getFullYear()}`] = {}
    }
    if (!tasksByYear[`${taskDate.getFullYear()}`][`${month}`]) {
      tasksByYear[`${taskDate.getFullYear()}`][`${month}`] = {
        month: `${taskDate.toLocaleString('default', { month: 'long' })}`,
        tasks: []
      }
    }
    tasksByYear[`${taskDate.getFullYear()}`][`${month}`].tasks.push(task);
  })

  return {
    props: {
      tasks: tasksByYear
    },
  }
}
