import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { PaginatedUserOrder } from "@/types";
import { OrderStatus, PaymentStatus, Prisma } from "@prisma/client";
import { z } from "zod";

// Input validation schema
const paginatedOrderSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
  description: z.string().optional(),
  status: z.string().optional(),
  invoice: z.string().optional(),
});

type GetPaginatedOrderProps = z.infer<typeof paginatedOrderSchema>;

export async function getPaginatedUserOrders({
  page,
  per_page,
  sort = "createdAt.desc",
  invoice: paymentStatus,
  description,
  status,
}: GetPaginatedOrderProps) {
  const session = await auth();

  if (!session?.user?.id) throw new Error("Unauthorized!");

  const offset = (page - 1) * per_page;

  const [column = "createdAt", order = "desc"] = sort.split(".") as [keyof Prisma.OrderOrderByWithRelationInput, "asc" | "desc"];

  const statuses = status?.split(".") as OrderStatus[] | undefined;
  const paymentStatuses = paymentStatus?.split(".") as PaymentStatus[] | undefined;

  // Consolidate filters into a single object
  const filters = {
    invoice: {
      paymentStatus: paymentStatuses?.length ? { in: paymentStatuses } : undefined,
    },
    description: description ? { contains: description } : undefined,
    status: statuses?.length ? { in: statuses } : undefined,
  };

  const [orders, totalOrders] = await prisma.$transaction([
    prisma.order.findMany({
      skip: offset,
      take: per_page,
      where: filters,
      orderBy: { [column]: order },
      include: {
        invoice: {
          include: { medicines: true },
        },
        user: true,
        pharmacy: {
          include: { address: true },
        },
        prescription: {
          include: { images: true },
        },
      },
    }),
    prisma.order.count({
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
