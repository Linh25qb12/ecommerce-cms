
import prismadb from "@/lib/prismadb";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    req: NextRequest
) {
    try {
        const body = await req.json();
        const { name, password, email, storeId } = body;
        const hashedPassword = await hash(password, 12);

        const user = await prismadb.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword,
                storeId: storeId
            },
        });

        return new NextResponse(
            JSON.stringify({
                status: "success",
                data: { user: { ...user, password: undefined } },
            }),
            {
                status: 201,
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (error: any) {
        if (error) {
            return new NextResponse("failed validations", error);
        }

        if (error.code === "P2002") {
            return new NextResponse("user with that email already exists", { status: 409 });
        }

        return new NextResponse(error.message, { status: 500 });
    }
}
