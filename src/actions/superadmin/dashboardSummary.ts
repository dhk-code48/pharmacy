"use server";

import { prisma } from "@/lib/db";
import { DashboardSummaryStats } from "@/types";
import { cache } from "react";

export const getDashboardSummary = cache(async (timeRange: "week" | "month" | "year" | "all"): Promise<DashboardSummaryStats> => {
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
        tx.pharmacy.count(),
        tx.order.count({
          where: startDate
            ? {
                createdAt: {
                  gte: startDate,
                },
              }
            : undefined,
        }),
        tx.user.count({
          where: {
            role: "USER",
            ...(startDate
              ? {
                  createdAt: {
                    gte: startDate,
                  },
                }
              : {}),
          },
        }),
        tx.invoice.aggregate({
          _sum: {
            total: true,
          },
          where: startDate
            ? {
                createdAt: {
                  gte: startDate,
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
  } finally {
    await prisma.$disconnect();
  }
});
