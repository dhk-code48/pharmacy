import { prisma } from "@/lib/db";
import { redis } from "@/lib/redis";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      cacheStrategy: { swr: 60, ttl: 60 },
      where: {
        email: email,
      },
      select: {
        name: true,
        pharmacy: {
          select: {
            slug: true,
          },
        },

        emailVerified: true,
      },
    });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  const cacheKey = `user:${id}`;

  try {
    // Getting user data from redis
    const cachedUser = await redis.get(cacheKey);

    // Validating if user data is cached in redis or not
    if (cachedUser) {
      return JSON.parse(cachedUser);
    }

    // Querying user data from prisma if it is not cached in redis
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        name: true,
        email: true,
        phoneNumber: true,
        image: true,
        role: true,
        pharmacy: {
          select: {
            slug: true,
          },
        },
      },
    });

    if (user) {
      // Caching user to redis
      await redis.set(cacheKey, JSON.stringify(user), "EX", 3600 * 24 * 2); // cache for 2 days
      return user;
    }
    return null;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};
