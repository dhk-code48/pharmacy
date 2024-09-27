import { prisma } from "@/lib/db";

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
  try {
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

    return user;
  } catch {
    return null;
  }
};
