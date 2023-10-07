import { authMiddleware } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "./lib/token";

let redirectToLogin = false;
async function storeMiddleware(req: NextRequest) {
    let token: string | undefined;

    if (req.cookies.has("token")) {
        token = req.cookies.get("token")?.value;
    } else if (req.headers.get("Authorization")?.startsWith("Bearer ")) {
        token = req.headers.get("Authorization")?.substring(7);
    }

    if (req.nextUrl.pathname.startsWith("/store-login") && (!token || redirectToLogin))
        return;

    const newHeaders = new Headers(req.headers)

    try {
        if (token) {
            const { sub } = await verifyJWT<{ sub: string }>(token);
            newHeaders.set("X-USER-ID", sub);
        }
    } catch (error) {
        redirectToLogin = true;
        if (req.nextUrl.pathname.startsWith("/api/auth")) {
            return new NextResponse("Token is invalid or user doesn't exists", { status: 401 });
        }

        return new NextResponse('Bad auth');
    }

    return NextResponse.next({
        request: {
            headers: newHeaders,
        },
    })
}

export default authMiddleware({
    beforeAuth: (req) => {
        return storeMiddleware(req);
    },
    publicRoutes: ["/api/:path*"],
});


export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
