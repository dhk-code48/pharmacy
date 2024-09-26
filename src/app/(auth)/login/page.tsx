"use client";
import { signIn } from "next-auth/react";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import Image from "next/image";

const IconChevronLeft = React.lazy(() => import("@tabler/icons-react").then((mod) => ({ default: mod.IconChevronLeft })));
const IconGoogle = React.lazy(() => import("@tabler/icons-react").then((mod) => ({ default: mod.IconBrandGoogleFilled })));
const IconFacebook = React.lazy(() => import("@tabler/icons-react").then((mod) => ({ default: mod.IconBrandFacebookFilled })));

const AuthLogin = () => {
  const handleLogin = async () => {
    const result = await signIn("google", { redirect: false });

    if (result?.error) {
      // Handle error
      console.error("Login failed:", result.error);
    } else if (result?.url) {
      // Redirect manually
      window.location.href = result.url;
    }
  };

  return (
    <div className="h-screen grid relative place-content-center grid-cols-1 lg:grid-cols-2">
      <div className="md:top-10 md:left-10 top-5 left-5 absolute">
        <Link href="/" className={buttonVariants({ variant: "outline" })}>
          <IconChevronLeft size={20} />
          Back Home
        </Link>
      </div>
      <Image className="hidden md:block aspect-video h-screen object-cover" src="/images/placeholder.png" alt="auth" width={1920} height={1080} />

      {/* Right side - OAuth Form */}
      <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto text-center">
        <h1 className="text-4xl font-extrabold">Welcome</h1>
        <p className="mt-2 text-sm">Get started with company name today</p>

        <div className="mt-8 space-y-6">
          <Button className="w-full" onClick={handleLogin}>
            <IconGoogle className="mr-2" />
            Continue With Google
          </Button>

          <Button
            disabled
            className="w-full flex items-center justify-center  text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <IconFacebook className="mr-2" />
            Continue With Facebook
          </Button>
        </div>

        <div className="mt-6 text-center text-sm">
          <p>By continuing up, you agree to our</p>
          <Link href="/terms" className="font-medium text-blue-600 hover:text-blue-500">
            Terms of Service
          </Link>
          {" and "}
          <Link href="/privacy" className="font-medium text-blue-600 hover:text-blue-500">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
    // <Card className="mx-auto max-w-sm w-full">
    //   <CardHeader>
    //     <CardTitle className="text-xl">Pharmacy</CardTitle>
    //     <CardDescription>Get started with Pharmacy today</CardDescription>
    //   </CardHeader>
    //   <CardContent>
    //     <form
    //       action={async () => {
    //         "use server";
    //         await signIn("google");
    //       }}
    //     >
    //       <Button variant="expandIcon" icon="arrowRight" iconPlacement="right">
    //         <Icons.google />
    //         Continue With Google
    //       </Button>
    //     </form>
    //     <div className="mt-4 pt-4 text-center text-sm border-t">
    //       A pharmacy owner?
    //       <Link href="#" className="underline">
    //         Create Pharmacy
    //       </Link>
    //     </div>
    //   </CardContent>
    // </Card>
  );
};

export default AuthLogin;
