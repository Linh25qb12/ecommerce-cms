import prismadb from "@/lib/prismadb";
import { signJWT } from "@/lib/token";
import { compare } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const data = body;

        const user = await prismadb.user.findUnique({
            where: { email: data.email },
        });

        if (!user || !(await compare(data.password, user.password))) {
            return new NextResponse("Invalid email or password", { status: 401 });
        }

        const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN as string;

        const token = await signJWT(
            { sub: user.id },
            { exp: `${JWT_EXPIRES_IN}m` }
        );

        const tokenMaxAge = parseInt(JWT_EXPIRES_IN) * 60;
        const cookieOptions = {
            name: "token",
            value: token,
            httpOnly: true,
            path: "/",
            secure: process.env.NODE_ENV !== "development",
            maxAge: tokenMaxAge,
        };

        const response = new NextResponse(
            JSON.stringify({
                status: "success",
                token,
            }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        );

        await Promise.all([
            response.cookies.set(cookieOptions),
            response.cookies.set({
                name: "logged-in",
                value: "true",
                maxAge: tokenMaxAge,
            }),
        ]);

        return response;
    } catch (error: any) {
        if (error instanceof ZodError) {
            return new NextResponse("Failed validations", { status: 400 });
        }

        return new NextResponse(error.message, { status: 500 });
    }
}
