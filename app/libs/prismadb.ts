import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;

//Changed below code for deployment error fix
// import { PrismaClient } from "@prisma/client";

// declare global {
//   var prisma: PrismaClient;
// }

// const client = globalThis.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

// export default client;
