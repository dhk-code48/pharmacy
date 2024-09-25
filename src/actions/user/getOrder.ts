import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export default async function getUserOrder({ id }: { id: number }) {
  const session = await auth();

  if (!session?.user.id) throw new Error("UnAuthorized!!");

  const order = await prisma.order.findUnique({
    cacheStrategy: { swr: 60, ttl: 60 },
    where: {
      userId: session.user.id,
      id,
    },
    include: {
      user: true,
      invoice: {
        include: {
          medicines: true,
        },
      },
      pharmacy: {
        include: {
          address: true,
        },
      },
      prescription: {
        include: {
          images: true,
        },
      },
    },
  });

  if (!order) throw new Error("Not Found!");

  return order;
}
