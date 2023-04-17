import { prisma } from "@/server/db";
import { serverSession } from "@/server/server-session";

export default async function handler(req, res) {
  // Check current session.
  const session = await serverSession(req, res)
  if (!session) {
    res.status(401).json({
      success: false,
      error: ['You must be logged in.'],
      session: session
    })
    return;
  }

  // Check for request type and process request.
  switch (req.method) {
    case 'POST':
      addTask(req, res, session.user)
      break
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

/**
 * Add new task to the database.
 */
async function addTask(req, res, user) {
  // Retrieve current user from the database.
  const prismaUser = await prisma.user.findUnique({
    where: { email: user.email },
  })

  if (!prismaUser) {
    res.status(401).json({
      success: false,
      error: ['Unauthorized'],
    })
    return
  }

  // Get task fields.
  const { title, description, startDate } = req.body;

  // Set empty errors list and validate task fields.
  const errorsList = [];

  if (title.length === 0 ) {
    errorsList.push('Please type a title')
  }

  if (description.length === 0 ) {
    errorsList.push('Please type a description')
  }

  if (new Date(startDate) <= new Date() ) {
    errorsList.push('Please select a date in the future')
  }

  // Return errors list if they exist.
  if (errorsList.length > 0) {
    res.status(400).json({
      success: false,
      error: errorsList,
    })
    return
  }

  // Try to create new task.
  try {
    const createTask = await prisma.task.create({
      data: {
        title,
        description,
        startDate,
        userId: prismaUser.id,
      },
    });

    res.status(200).json({
      success: true,
      message: 'Task created successfully!',
      task: createTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: ['Task creation failed. Please try again later.'],
    });
  }
}