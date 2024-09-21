import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { PharmacyStatus, Prisma } from "@prisma/client";
import { z } from "zod";

// Input validation schema
const paginatedOrderSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
  description: z.string().optional(),
  name: z.string().optional(),
  status: z.string().optional(),
});

type GetPaginatedOrderProps = z.infer<typeof paginatedOrderSchema> & {
  slug?: string;
};

export async function getPaginatedPharmacies({ page, per_page, sort = "createdAt.desc", description, status, name }: GetPaginatedOrderProps) {
  const session = await auth();

  if (!session?.user?.id) throw new Error("Unauthorized!");

  const offset = (page - 1) * per_page;

  const [column = "createdAt", order = "desc"] = sort.split(".") as [keyof Prisma.PharmacyOrderByWithRelationInput, "asc" | "desc"];

  const pharmacyStatus = status as PharmacyStatus | undefined;

  // Consolidate filters into a single object
  const filters = {
    name: name,
    status: pharmacyStatus ? { equals: pharmacyStatus } : undefined,
  };

  const [orders, totalOrders] = await prisma.$transaction([
    prisma.pharmacy.findMany({
      skip: offset,
      take: per_page,
      where: filters,
      orderBy: { [column]: order },
      include: {
        user: true,
      },
    }),
    prisma.pharmacy.count({
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
