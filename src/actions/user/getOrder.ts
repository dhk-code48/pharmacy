import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export default async function getUserOrder({ id }: { id: number }) {
  const session = await auth();

  if (!session?.user.id) throw new Error("UnAuthorized!!");

  const order = await prisma.order.findUnique({
    where: {
      userId: session.user.id,
      id,
    },
    include: {
      invoice: {
        include: {
          medicines: true,
        },
      },
      pharmacy: {
        include: {
          address: true,
        },
        select: {
          user: {
            select: {
              phoneNumber: true,
            },
          },
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
