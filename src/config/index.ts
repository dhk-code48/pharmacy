import { IconNames } from "@/types";
import { OrderStatus } from "@prisma/client";

export const ORDER_STATUS_COLOR = {
  PRESCRIPTION_UNDER_REVIEW: {
    value: "#F97316", // Orange 500
    foreground: "#000000", // White
  },
  INVOICE_PROVIDED: {
    value: "#3B82F6", // Blue 500
    foreground: "#0000000", // White
  },
  ORDER_CONFIRMED: {
    value: "#10B981", // Green 500
    foreground: "#000000", // White
  },
  OUT_OF_STOCK: {
    value: "#EF4444", // Red 500
    foreground: "#000000", // White
  },
  CANCELLED_BY_USER: {
    value: "#6B7280", // Gray 500
    foreground: "#FFFFFF", // White
  },
  READY_FOR_SHIPPING: {
    value: "#F59E0B", // Yellow 500
    foreground: "#000000", // Black
  },
  SHIPPED: {
    value: "#14B8A6", // Teal 500
    foreground: "#000000", // White
  },
  DELIVERED: {
    value: "#2563EB", // Blue 600
    foreground: "#FFFFFF", // White
  },
  RETURN_REQUESTED: {
    value: "#F87171", // Red 400
    foreground: "#000000", // White
  },
  RETURNED: {
    value: "#DC2626", // Red 600
    foreground: "#FFFFFF", // White
  },
  COMPLETED: {
    value: "#7C3AED", // Purple 600
    foreground: "#FFFFFF", // White
  },
};

export const PAYMENT_STATUS = {
  UNPAID: {
    value: "#EF4444",
    foreground: "#00000",
  },
  PENDING: {
    value: "#F97316",
    foreground: "#000000",
  },
  PAID: {
    value: "#10B981",
    foreground: "#000000",
  },
  CANCLED: {
    value: "#DC2626",
    foreground: "#ffffff",
  },
  "INVOICE NOT SENDED": {
    value: "#000000",
    foreground: "#ffffff",
  },
};

export const ORDER_STATUS_STEPS: { status: OrderStatus; icon: IconNames; progress: number }[] = [
  { status: "PRESCRIPTION_UNDER_REVIEW", icon: "alertTriangle", progress: 10 },
  { status: "INVOICE_PROVIDED", icon: "checkCircle", progress: 20 },
  { status: "ORDER_CONFIRMED", icon: "package", progress: 30 },
  { status: "SHIPPED", icon: "truck", progress: 50 },
  { status: "DELIVERED", icon: "checkCircle", progress: 70 },
  { status: "COMPLETED", icon: "checks", progress: 100 },
  { status: "OUT_OF_STOCK", icon: "xCircle", progress: 0 },
  { status: "CANCELLED_BY_USER", icon: "xCircle", progress: 0 },
  { status: "RETURN_REQUESTED", icon: "returnRequested", progress: 0 },
  { status: "RETURNED", icon: "refresh", progress: 0 },
];

export const PHARMACY_STATUS_COLOR = {
  UNVERIFIED: {
    value: "#EF4444", // Red 500
    foreground: "#000000", // White
  },
  VERIFIED: {
    value: "#2563EB", // Blue 600
    foreground: "#FFFFFF", // White
  },
};
export const FEEDBACK_FROM = {
  USER: {
    value: "#7C3AED", // Red 500
    foreground: "#ffffff", // White
  },
  PHARMACY: {
    value: "#3B82F6", // Blue 600
    foreground: "#000000", // White
  },
};
export const FEEDBACK_TYPE = {
  PROBLEM: {
    value: "#EF4444", // Red 500
    foreground: "#000000", // White
  },
  QUESTION: {
    value: "#F59E0B", // Blue 600
    foreground: "#000000", // White
  },
  SUGGESTION: {
    value: "#3B82F6", // Blue 600
    foreground: "#000000", // White
  },
};
