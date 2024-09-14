import Redis from "ioredis";
import { type NextRequest, NextResponse } from "next/server";

const redis = new Redis();

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const hasSlug = searchParams.has("slug");
  const slug = hasSlug ? searchParams.get("slug") : undefined;

  const views = (await redis.get(["pageviews", "posts", slug].join(":"))) ?? 0;

  return new NextResponse(views.toString(), { status: 200 });
}

export async function POST(request: NextRequest) {
  const ip = request.ip;
  const searchParams = request.nextUrl.searchParams;
  const hasSlug = searchParams.has("slug");
  const slug = hasSlug ? searchParams.get("slug") : undefined;

  if (ip) {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(ip));

    const hash = Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    const isNew = await redis.set(
      ["deduplicate", hash, slug].join(":"),
      JSON.stringify(true), // You need to store some value, e.g., "1"
      "EX",
      24 * 60 * 60, // Expiry time in seconds (1 day)
      "NX" // Only set the key if it does not already exist
    );

    if (!isNew) {
      new NextResponse("Already Increased Counter", { status: 200 });
    }
  }

  if (!slug) {
    new NextResponse("Slug Not Found", { status: 404 });
  }

  await redis.incr(["pageviews", "posts", slug].join(":"));
  return new NextResponse("Increased Counter", { status: 202 });
}
