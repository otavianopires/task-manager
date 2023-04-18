import { formatDateTime, userOptions } from "@/lib/helpers";
import { prisma } from "@/server/db";

export default function TaskDetails({ task }) {
  const lineToParagraph = (text) => {
    const testArr = text.split('\n\n');
    return testArr.map((str, index) => <p key={index}>{str}</p>)
  }
  return (
    <article>
      <header className="border-b border-solid border-secondary mb-16">
        <h1 className="text-secondary">{task.title}</h1>
        <time className="mb-6 block text-sm">{formatDateTime(task.startDate)}</time>
      </header>
      <div className="entry">
        {lineToParagraph(task.description)}
      </div>
    </article>
  )
}

TaskDetails.auth = userOptions;

export async function getStaticProps({params}) {
  const { id } = params;
  const task = await prisma.task.findUnique({
    where: {
      id: parseInt(id),
    }
  });
  return {
    props: {
      task: JSON.parse(JSON.stringify(task))
    },
    revalidate: 60
  }
}

export async function getStaticPaths() {
  const tasks = await prisma.task.findMany();
  return {
    paths: tasks.map(task => ({
      params: {
        id: `${task.id}`
      }
    })),
    fallback: 'blocking'
  }
}
