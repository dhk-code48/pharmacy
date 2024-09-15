import { auth } from "@/auth";
import { NextResponse } from "next/server";

const pharmacyPathPrefix = "/pharmacy/";
const publicRoutes = ["/", "/privacy", "/terms"];
const authRoutes = ["/login", "/api/auth/session"];
const userPathPrefix = "/user/";
const apiAuthPrefix = "/api/auth";
const phoneNumberFormPath = "/validate-phone"; // Route to phone number form

export default auth(async (req): Promise<Response | void> => {
  const { nextUrl } = req;
  req.headers.set("Cache-Control", "no-store");
  const user = req.auth?.user;

  // Checking if the user is logged in
  const isLoggedIn = !!user;
  const hasPhoneNumber = !!user?.phoneNumber; // Check if the user has a phone number

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  console.log("Is Login => ", isLoggedIn);
  console.log("Has Phone Number => ", user?.phoneNumber);
  console.log("Is Auth Routes => ", isAuthRoute);
  console.log("PATH => ", nextUrl.pathname);

  // Helper function for redirecting based on user type
  const redirectToUserPage = () => {
    if (user?.pharmacyId) {
      return NextResponse.rewrite(new URL(`/pharmacy/${user.pharmacyId}`, req.url));
    }
    if (user?.id) {
      return NextResponse.rewrite(new URL(`/user/${user.id}`, req.url));
    }
    return NextResponse.next();
  };

  if (nextUrl.pathname === "/" && isLoggedIn) {
    return redirectToUserPage();
  }

  // Handle API auth routes (No protection needed)
  if (isApiAuthRoute) {
    return;
  }

  // Redirect logged-in users from auth routes (e.g., /login) to their respective dashboard
  if (isAuthRoute && isLoggedIn) {
    return redirectToUserPage();
  }

  // Redirect unauthenticated users accessing protected routes to the login page
  if (!isLoggedIn && !isPublicRoute) {
    const callbackUrl = `${nextUrl.pathname}${nextUrl.search || ""}`;
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return NextResponse.rewrite(new URL(`/login?callbackUrl=${encodedCallbackUrl}`, req.url));
  }

  if (nextUrl.pathname.startsWith(phoneNumberFormPath) && hasPhoneNumber) {
    return redirectToUserPage();
  }

  // If the user is logged in and accessing a protected route but doesn't have a phone number, redirect to phone number form
  if (isLoggedIn && !hasPhoneNumber && (nextUrl.pathname.startsWith(userPathPrefix) || nextUrl.pathname.startsWith(pharmacyPathPrefix))) {
    return NextResponse.rewrite(new URL(`${phoneNumberFormPath}`, req.url));
  }

  // Validate pharmacy ownership if accessing pharmacy routes
  if (nextUrl.pathname.startsWith(pharmacyPathPrefix)) {
    return handlePharmacyOwnership(req);
  }

  // Validate user ownership if accessing user routes
  if (nextUrl.pathname.startsWith(userPathPrefix)) {
    return handleUserOwnership(req);
  }

  return NextResponse.next();
});

// Helper function to handle pharmacy ownership validation
const handlePharmacyOwnership = (req: any): Response | void => {
  const { nextUrl } = req;
  const user = req.auth?.user;

  // Ensure user has pharmacy ownership
  if (!user?.pharmacyId) {
    // If no pharmacyId, redirect to user page or login
    if (user?.id) {
      return NextResponse.rewrite(new URL(`/user/${user.id}`, req.url));
    }
    return NextResponse.rewrite(new URL("/login", req.url));
  }

  // Ensure the pharmacy slug matches the user's pharmacyId
  const pharmacySlug = nextUrl.pathname.split("/")[2]; // Extract the slug from the path
  if (pharmacySlug !== user.pharmacyId) {
    // If slug doesn't match, redirect to the correct pharmacy page
    return NextResponse.rewrite(new URL(`/pharmacy/${user.pharmacyId}`, req.url));
  }

  return NextResponse.next();
};

// Helper function to handle user ownership validation
const handleUserOwnership = (req: any): Response | void => {
  const { nextUrl } = req;
  const user = req.auth?.user;

  // Ensure user is logged in
  if (!user) {
    return NextResponse.rewrite(new URL("/login", req.url));
  }

  // Extract user ID from the path
  const userSlug = nextUrl.pathname.split("/")[2]; // Assuming path is like /user/[id]
  if (userSlug !== user.id) {
    // If user ID from the path doesn't match the authenticated user's ID, redirect
    return NextResponse.rewrite(new URL(`/user/${user.id}`, req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
