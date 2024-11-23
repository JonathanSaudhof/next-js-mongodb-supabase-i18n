// export default chain([withI18n, withAuth]);

import { NextResponse, type NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { i18nMiddleWare, locales } from "./locales/middleware";
import getRoutesWithLocale, { routesConfig } from "./config/routes.config";

export async function middleware(request: NextRequest) {
  const response = i18nMiddleWare(request);

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: "", ...options });
          response.cookies.set({ name, value: "", ...options });
        },
      },
    }
  );

  await supabase.auth.getUser();

  const user = await supabase.auth.getUser();

  const protectedRoutes = locales.map((locale) =>
    getRoutesWithLocale("protected.home", locale)
  );

  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // protected routes
  if (isProtectedRoute && user.error) {
    return NextResponse.redirect(
      new URL(routesConfig.unprotected.signIn, request.url)
    );
  }

  const isSignInRoute = locales.some((locale) => {
    return request.nextUrl.pathname == "/" + locale;
  });

  if (isSignInRoute && !user.error) {
    return NextResponse.redirect(
      new URL(routesConfig.protected.home, request.url)
    );
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    "/",
    "/(de|en)/:path*",
  ],
};
