"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-6xl font-bold">404</h1>
      <Image src="/images/rocket-crashed.svg" alt="404" width={400} height={400} className="pointer-events-none mb-5 mt-6 dark:invert" />
      <div className="gap-2 text-balance flex flex-col px-4 text-center text-2xl font-medium">
        Page not found
        <Button onClick={() => router.back()}>Go Back</Button>
        <span className="text-sm text-muted-foreground">Or</span>
        <Link href="/" className="text-muted-foreground underline underline-offset-4 hover:text-purple-500">
          Home Page
        </Link>
      </div>
    </div>
  );
}
