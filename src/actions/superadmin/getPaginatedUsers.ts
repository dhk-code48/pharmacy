import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { z } from "zod";

// Input validation schema
const paginatedOrderSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  phoneNumber: z.string().optional(),
});

type GetPaginatedOrderProps = z.infer<typeof paginatedOrderSchema> & {
  slug?: string;
};

export async function getPaginatedUsers({ page, per_page, sort = "createdAt.desc", email, name }: GetPaginatedOrderProps) {
  const session = await auth();

  if (!session?.user?.id) throw new Error("Unauthorized!");

  const offset = (page - 1) * per_page;

  const [column = "createdAt", order = "desc"] = sort.split(".") as [keyof Prisma.UserOrderByWithRelationInput, "asc" | "desc"];

  // Consolidate filters into a single object
  const filters = {
    name: name ? { contains: name } : undefined,
    email: email ? { contains: email } : undefined,
  };

  const [orders, totalOrders] = await prisma.$transaction([
    prisma.user.findMany({
      skip: offset,
      take: per_page,
      where: filters,
      orderBy: { [column]: order },
      include: {
        address: true,
        orders: {
          include: {
            invoice: true,
          },
        },
      },
    }),
    prisma.user.count({
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
