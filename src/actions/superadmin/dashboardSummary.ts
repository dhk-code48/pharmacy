"use server";

import { prisma } from "@/lib/db";
import { DashboardSummaryStats } from "@/types";
import { cache } from "react";

export const getDashboardSummary = cache(async (timeRange: "week" | "month" | "year" | "all", slug?: string): Promise<DashboardSummaryStats> => {
  const currentDate = new Date();
  let startDate: Date | undefined;

  switch (timeRange) {
    case "week":
      startDate = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case "month":
      startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());
      break;
    case "year":
      startDate = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate());
      break;
    case "all":
      startDate = undefined;
      break;
  }

  try {
    const stats = await prisma.$transaction(async (tx) => {
      const [totalPharmacies, totalOrders, totalCustomers, revenueSum] = await Promise.all([
        tx.pharmacy.count({
          cacheStrategy: { swr: 60, ttl: 60 },
          where: {
            status: "VERIFIED",
          },
        }),
        tx.order.count({
          cacheStrategy: { swr: 60, ttl: 60 },
          where: startDate
            ? {
                createdAt: {
                  gte: startDate,
                },
                pharmacy: {
                  slug: slug ? { equals: slug } : undefined,
                },
              }
            : undefined,
        }),
        tx.user.count({
          cacheStrategy: { swr: 60, ttl: 60 },
          where: {
            role: "USER",
            ...(startDate
              ? {
                  createdAt: {
                    gte: startDate,
                  },
                  pharmacy: {
                    slug: slug ? { equals: slug } : undefined,
                  },
                }
              : {}),
          },
        }),
        tx.invoice.aggregate({
          cacheStrategy: { swr: 60, ttl: 60 },
          _sum: {
            total: true,
          },
          where: startDate
            ? {
                createdAt: {
                  gte: startDate,
                },
                pharmacy: {
                  slug: slug ? { equals: slug } : undefined,
                },
              }
            : {},
        }),
      ]);

      return {
        totalPharmacies,
        totalOrders,
        totalCustomers,
        totalRevenue: revenueSum._sum.total || 0,
      };
    });

    return stats;
  } catch (error) {
    console.error("Error fetching summary stats:", error);
    throw new Error("Failed to fetch summary statistics");
  }
});
