import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { FeedBackFrom, FeedBackTopic, Prisma } from "@prisma/client";
import { z } from "zod";

// Input validation schema
const paginatedOrderSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
  from: z.string().optional(),
  topic: z.string().optional(),
  title: z.string().optional(),
  message: z.string().optional(),
});

type GetPaginatedOrderProps = z.infer<typeof paginatedOrderSchema> & {
  slug?: string;
};

export async function getPaginatedFeedBack({ page, per_page, sort = "createdAt.desc", from, message, slug, title, topic }: GetPaginatedOrderProps) {
  const session = await auth();

  if (!session?.user?.id) throw new Error("Unauthorized!");

  const offset = (page - 1) * per_page;

  const [column = "createdAt", order = "desc"] = sort.split(".") as [keyof Prisma.FeedBackOrderByWithRelationInput, "asc" | "desc"];

  const feedBackFrom = from?.split(".") as FeedBackFrom[] | undefined;
  const feedBackTopic = topic?.split(".") as FeedBackTopic[] | undefined;

  // Consolidate filters into a single object
  const filters = {
    from: feedBackFrom ? { in: feedBackFrom } : undefined,
    message: message ? { contains: message } : undefined,
    title: title ? { contains: title } : undefined,
    topic: feedBackTopic ? { in: feedBackTopic } : undefined,
  };

  const [orders, totalOrders] = await prisma.$transaction([
    prisma.feedBack.findMany({
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
    prisma.feedBack.count({
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
