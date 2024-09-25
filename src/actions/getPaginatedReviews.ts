import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { FeedBackFrom, FeedBackTopic, Prisma } from "@prisma/client";
import { z } from "zod";

// Input validation schema
const paginatedOrderSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
  comment: z.string().optional(),
  rating: z.string().optional(),
});

type GetPaginatedOrderProps = z.infer<typeof paginatedOrderSchema> & {
  pharmacySlug?: string;
};

export async function getPaginatedReviews({ page, per_page, sort = "createdAt.desc", comment, pharmacySlug, rating }: GetPaginatedOrderProps) {
  const session = await auth();

  if (!session?.user?.id) throw new Error("Unauthorized!");

  const offset = (page - 1) * per_page;

  const [column = "createdAt", order = "desc"] = sort.split(".") as [keyof Prisma.ReviewOrderByWithRelationInput, "asc" | "desc"];

  const ratings = (rating?.split(".") as string[]) || undefined;
  const intRatings = ratings ? ratings.map((rating) => parseInt(rating)) : undefined;

  // Consolidate filters into a single object
  const filters = {
    comment: comment ? { contains: comment } : undefined,

    rating: intRatings ? { in: intRatings } : undefined,
    pharmacy: pharmacySlug ? { slug: { equals: pharmacySlug } } : undefined,
  };

  const [orders, totalOrders] = await prisma.$transaction([
    prisma.review.findMany({
      cacheStrategy: { swr: 60, ttl: 60 },
      skip: offset,
      take: per_page,
      where: filters,
      orderBy: { [column]: order },
      include: {
        user: {
          include: {
            address: true,
          },
        },
      },
    }),
    prisma.review.count({
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
