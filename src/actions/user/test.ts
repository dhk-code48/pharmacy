import { redis } from "@/lib/redis";

export default async function test() {
  const h = await redis.get("Hello");
  return h;
}
