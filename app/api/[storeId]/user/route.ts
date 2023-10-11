import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    req: NextRequest
) {
    try {
        const body = await req.json();
        const { name, password, email, storeId } = body;
        const user = await prismadb.user.create({
            data: {
                name: name,
                email: email,
                password: password,
                storeId: storeId
            },
        });

        return NextResponse.json(user);
    } catch (error: any) {
        console.log('USER_POST]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
};

export async function GET(
    req: NextRequest
) {
    try {
        const email = req.nextUrl.searchParams.get("email") as string;
        const user = await prismadb.user.findUnique({
            where: { email: email },
        });

        return NextResponse.json(user);

    } catch (error) {
        console.log('USER_GET]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}