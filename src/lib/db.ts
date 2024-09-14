import { PrismaClient } from "@prisma/client";

// Declare global variables to cache PrismaClient and Redis instances
declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient;
  // eslint-disable-next-line no-var
  var cachedRedis: any;
}

// Initialize PrismaClient
export let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }
  prisma = global.cachedPrisma;
}
