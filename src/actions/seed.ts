"use server";
import { redis } from "@/lib/redis";
const notifications = [
  {
    title: "Welcome to the Pharmacy Management System",
    message: "Thank you for joining us! Explore the features and manage your pharmacy efficiently.",
    icon: "/icons/order.png",
    url: "/welcome",
    timestamp: Date.now() - 25 * 24 * 60 * 60 * 1000, // 25 days ago
  },
  {
    title: "New Feature Released",
    message: "We've added a new feature to help you with inventory management.",
    icon: "/icons/order.png",
    url: "/features",
    timestamp: Date.now() - 10 * 24 * 60 * 60 * 1000, // 10 days ago
  },
  {
    title: "System Maintenance",
    message: "Scheduled maintenance will occur on September 30th. Expect brief downtime.",
    icon: "/icons/order.png",
    url: "/maintenance",
    timestamp: Date.now() - 5 * 24 * 60 * 60 * 1000, // 5 days ago
  },
  {
    title: "Update Available",
    message: "A new update is available for the Pharmacy Management System. Please update to the latest version.",
    url: "/update",
    timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 days ago
  },
  {
    title: "Reminder: Expired Inventory",
    message: "Some items in your inventory are about to expire. Please review and update.",
    icon: "/icons/shipped.png",
    url: "/inventory",
    timestamp: Date.now() - 1 * 24 * 60 * 60 * 1000, // 1 day ago
  },
];

// Adding the dummy notifications to Redis
export async function seedNotification(userId: string) {
  for (const notification of notifications) {
    await redis.zadd(
      `user:${userId}:notifications`,
      notification.timestamp,
      JSON.stringify({
        title: notification.title,
        message: notification.message,
        icon: notification.icon,
        url: notification.url,
        timestamp: notification.timestamp,
      })
    );
  }
}
