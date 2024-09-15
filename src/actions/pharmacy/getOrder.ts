import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export default async function getPharmacyOrder({ id, slug }: { id: number; slug: string }) {
  const session = await auth();

  if (!session?.user.pharmacyId) throw new Error("UnAuthorized!!");

  const order = await prisma.order.findUnique({
    where: {
      pharmacySlug: slug,
      id,
    },
    include: {
      pharmacy: {
        include: {
          address: true,
        },
      },
      invoice: {
        include: {
          medicines: true,
        },
      },
      user: true,
      userAddress: true,
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
