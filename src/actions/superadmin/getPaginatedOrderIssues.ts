import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { PharmacyStatus, Prisma } from "@prisma/client";
import { z } from "zod";

// Input validation schema
const paginatedOrderSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
  topic: z.string().optional(),
});

type GetPaginatedOrderProps = z.infer<typeof paginatedOrderSchema>;

export default async function getPaginatedOrderIssues({ page, per_page, sort = "createdAt.desc", topic }: GetPaginatedOrderProps) {
  const session = await auth();

  if (!session?.user?.id) throw new Error("Unauthorized!");

  const offset = (page - 1) * per_page;

  const [column = "createdAt", order = "desc"] = sort.split(".") as [keyof Prisma.OrderIssueOrderByRelationAggregateInput, "asc" | "desc"];

  // Consolidate filters into a single object
  const filters = {
    topic: topic ? { contains: topic } : undefined,
  };

  const [orders, totalOrders] = await prisma.$transaction([
    prisma.orderIssue.findMany({
      cacheStrategy: { swr: 60, ttl: 60 },
      skip: offset,
      take: per_page,
      where: filters,
      orderBy: { [column]: order },
      include: {
        order: true,
        pharmacy: {
          include: {
            user: true,
            address: true,
          },
        },
        user: true,
      },
    }),
    prisma.orderIssue.count({
      cacheStrategy: { swr: 60, ttl: 60 },
      where: filters,
    }),
  ]);

  const pageCount = Math.ceil(totalOrders / per_page);

  return {
    data: orders,
    pageCount,
    total: totalOrders,
  };
}
