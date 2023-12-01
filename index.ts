import { createYoga } from 'graphql-yoga';
import schema from './schema';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

const yoga = createYoga({
    schema: schema,
    context: ()=> { return { prisma }}
})
const server = Bun.serve(yoga as any)
console.info(
    `Server is running on ${new URL(
      yoga.graphqlEndpoint,
      `http://${server.hostname}:${server.port}`
    )}`
  )