export { auth as default } from "@/auth";

// // Define route prefixes and public routes
// const ROUTES = {
//   PUBLIC: ["/", "/privacy", "/terms"],
//   AUTH: ["/login", "/api/auth/session"],
//   USER: "/user",
//   PHARMACY: "/pharmacy",
//   PHONE_VALIDATION: "/validate-phone",
//   API_AUTH: "/api/auth",
// };

// // Helper function to check if a path starts with a prefix
// const pathStartsWith = (path: string, prefix: string) => path.startsWith(prefix) || path === prefix;

// export async function middleware(request: Request) {
//   const { pathname } = new URL(request.url);

//   // Handle public routes and API auth routes
//   if (ROUTES.PUBLIC.includes(pathname) || pathStartsWith(pathname, ROUTES.API_AUTH)) {
//     return NextResponse.next();
//   }

//   const session = await auth();
//   const authorized = !!session?.user;

//   // Logging (consider using a proper logging solution in production)
//   console.log(`Path: ${pathname}, Authenticated: ${!!session?.user}`);

//   // Redirect unauthenticated users to login
//   if (!session?.user) {
//     const callbackUrl = encodeURIComponent(`${pathname}${new URL(request.url).search}`);
//     return NextResponse.redirect(new URL(`/login?callbackUrl=${callbackUrl}`, request.url));
//   }

//   const { user } = session;
//   const hasPhoneNumber = !!user.phoneNumber;

//   // Redirect authenticated users from auth routes
//   if (ROUTES.AUTH.includes(pathname) && authorized) {
//     return redirectToUserPage(request, user);
//   }

//   // Handle phone number validation
//   if (pathStartsWith(pathname, ROUTES.PHONE_VALIDATION)) {
//     return hasPhoneNumber ? redirectToUserPage(request, user) : NextResponse.next();
//   }

//   // Ensure phone number is provided for user and pharmacy routes
//   if (!hasPhoneNumber && (pathStartsWith(pathname, ROUTES.USER) || pathStartsWith(pathname, ROUTES.PHARMACY))) {
//     return NextResponse.redirect(new URL(ROUTES.PHONE_VALIDATION, request.url));
//   }

//   // Handle pharmacy routes
//   if (pathStartsWith(pathname, ROUTES.PHARMACY)) {
//     return handlePharmacyAccess(request, user);
//   }

//   // Handle user routes
//   if (pathStartsWith(pathname, ROUTES.USER)) {
//     return handleUserAccess(request, user);
//   }

//   // For all other routes, allow access
//   return NextResponse.next();
// }

// // Helper function to redirect to user's appropriate page
// function redirectToUserPage(request: Request, user: any) {
//   const redirectPath = user.pharmacyId ? `${ROUTES.PHARMACY}/${user.pharmacyId}` : `${ROUTES.USER}/${user.id}`;
//   return NextResponse.redirect(new URL(redirectPath, request.url));
// }

// // Handle pharmacy route access
// function handlePharmacyAccess(request: Request, user: any) {
//   const pharmacyId = new URL(request.url).pathname.split("/")[2];

//   if (user.pharmacyId !== pharmacyId) {
//     return redirectToUserPage(request, user);
//   }

//   return NextResponse.next();
// }

// // Handle user route access
// function handleUserAccess(request: Request, user: any) {
//   const userId = new URL(request.url).pathname.split("/")[2];

//   if (user.id !== userId) {
//     return redirectToUserPage(request, user);
//   }

//   return NextResponse.next();
// }

// Matcher configuration
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
};
