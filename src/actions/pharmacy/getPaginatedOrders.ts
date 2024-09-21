import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { OrderStatus, Prisma } from "@prisma/client";
import { z } from "zod";

// Input validation schema
const paginatedOrderSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
  description: z.string().optional(),
  status: z.string().optional(),
});

type GetPaginatedOrderProps = z.infer<typeof paginatedOrderSchema> & {
  slug?: string;
};

export async function getPaginatedPharmacyOrders({ page, per_page, sort, description, status, slug }: GetPaginatedOrderProps) {
  const session = await auth();

  if (!session?.user) throw new Error("Unauthorized!!");
  if (!session?.user.id) throw new Error("Unauthorized!!");

  const offset = (page - 1) * per_page;

  const [column, order] = (sort?.split(".") as [keyof Prisma.OrderOrderByWithRelationInput | undefined, "asc" | "desc" | undefined]) ?? [
    "createdAt",
    "desc",
  ];

  const statuses = (status?.split(".") as (keyof typeof OrderStatus)[]) ?? [];

  // Fetch orders of the specific user
  const orders = await prisma.order.findMany({
    skip: offset,
    take: per_page,
    where: {
      pharmacySlug: slug,
      pharmacy: {
        userId: session.user.id,
      },
      description: description ? { contains: description } : undefined,
      status: statuses.length > 0 ? { in: statuses } : undefined, // Only apply the status filter if statuses is not empty
    },
    orderBy: column && order ? { [column]: order } : { createdAt: "desc" },
    include: {
      invoice: {
        include: {
          medicines: true,
        },
      },
      user: {
        include: {
          address: true,
        },
      },
      pharmacy: {
        include: {
          address: true,
        },
      }, // Include related pharmacy data
      prescription: {
        include: {
          images: true,
        },
      }, // Include images associated with the order
    },
  });

  const totalOrders = await prisma.order.count({
    where: {
      pharmacySlug: slug,
      pharmacy: {
        userId: session.user.id,
      },
      description: description ? { contains: description } : undefined,
      status: statuses.length > 0 ? { in: statuses } : undefined, // Only apply the status filter if statuses is not empty
    },
  });

  const pageCount = Math.ceil(totalOrders / per_page);

  return {
    data: orders,
    pageCount,
    total: totalOrders,
  };
}
