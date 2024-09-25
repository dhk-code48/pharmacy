"use server";

import { prisma } from "@/lib/db";
import { DashboardData, OrderStatusData, RevenueData, TopSellingMedicine } from "@/types";
import { PrismaClient } from "@prisma/client";
import { cache } from "react";

export const getDashboardAnalytics = cache(async (timeRange: "week" | "month" | "year" | "all", slug?: string): Promise<DashboardData> => {
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
    const result = await prisma.$transaction(async (tx) => {
      // Revenue Overview
      const revenueOverview = await tx.invoice.groupBy({
        cacheStrategy: { swr: 60, ttl: 60 },
        by: ["createdAt"],
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
          : {
              pharmacy: {
                slug: slug ? { equals: slug } : undefined,
              },
            },
        orderBy: {
          createdAt: "asc",
        },
      });

      const revenueData: RevenueData[] = revenueOverview.map((item) => ({
        name: item.createdAt.toISOString().split("T")[0], // Format date as YYYY-MM-DD
        revenue: item._sum.total || 0,
      }));

      // Order Status Distribution
      const orderStatusDistribution = await tx.order.groupBy({
        cacheStrategy: { swr: 60, ttl: 60 },
        by: ["status"],
        _count: {
          _all: true,
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
          : {
              pharmacy: {
                slug: slug ? { equals: slug } : undefined,
              },
            },
      });

      const orderStatusData: OrderStatusData[] = orderStatusDistribution.map((item) => ({
        name: item.status,
        value: item._count._all,
      }));

      // Top Selling Medicines
      const topSellingMedicines = await tx.medicine.findMany({
        cacheStrategy: { swr: 60, ttl: 60 },
        select: {
          name: true,
          _count: {
            select: { invoices: true },
          },
        },
        where: {
          invoices: {
            some: startDate
              ? {
                  createdAt: {
                    gte: startDate,
                  },
                  pharmacy: {
                    slug: slug ? { equals: slug } : undefined,
                  },
                }
              : {
                  pharmacy: {
                    slug: slug ? { equals: slug } : undefined,
                  },
                },
          },
        },
        orderBy: {
          invoices: {
            _count: "desc",
          },
        },
        take: 5,
      });

      const topMedicinesData: TopSellingMedicine[] = topSellingMedicines.map((item) => ({
        name: item.name,
        sales: item._count.invoices,
      }));

      return {
        revenueOverview: revenueData,
        orderStatusDistribution: orderStatusData,
        topSellingMedicines: topMedicinesData,
      };
    });

    return result;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw new Error("Failed to fetch dashboard data");
  }
});
