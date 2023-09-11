import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { connectId } = body;

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        if (!connectId) {
            return new NextResponse('Missing required field!', { status: 400 });
        }

        const connect = await prismadb.connect.create({
            data: {
                accountId: userId,
                connectId: connectId,
            }
        });

        return NextResponse.json(connect);
    } catch (error) {
        console.log('[CONNECT_POST]', error);
        return new NextResponse('Internal error', { status: 500 });
    };
};

export async function GET(
    req: Request,
) {
    try {
        const { userId } = auth();


        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const connect = await prismadb.connect.findMany({
            where: {
                accountId: userId,
            }
        });

        return NextResponse.json(connect);
    } catch (error) {
        console.log('[CONNECT_POST]', error);
        return new NextResponse('Internal error', { status: 500 });
    };
}