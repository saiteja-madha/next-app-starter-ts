import { getSessionCookie } from "better-auth/cookies"
import { type NextRequest, NextResponse } from "next/server"

const publicPathsConfig = {
    exactPaths: ["/"],
    prefixes: ["/auth/"]
}

function isPublicPath(pathname: string): boolean {
    if (publicPathsConfig.exactPaths.includes(pathname)) {
        return true
    }
    for (const prefix of publicPathsConfig.prefixes) {
        if (pathname.startsWith(prefix)) {
            return true
        }
    }
    return false
}

export async function proxy(request: NextRequest) {
    const { pathname, search } = request.nextUrl

    // Check cookie for optimistic redirects for protected routes
    // Use getSession in your RSC to protect a route via SSR or useAuthenticate client side
    const sessionCookie = getSessionCookie(request)

    // If user is already logged in and trying to access auth pages, redirect to dashboard
    if (sessionCookie && pathname.startsWith("/auth/")) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    if (isPublicPath(pathname)) {
        return NextResponse.next()
    }

    if (!sessionCookie) {
        return NextResponse.redirect(new URL("/auth/sign-in", request.url))
    }

    return NextResponse.next()
}

// Match all routes except for static files and Next.js internal routes
export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always run for API routes
        "/(api|trpc)(.*)"
    ]
}
