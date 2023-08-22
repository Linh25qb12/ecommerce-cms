import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { name, value } = body;

        if (!userId) {
            return new NextResponse('Unauthenticated', { status: 401 });
        }

        if (!name || !value || !params.storeId) {
            return new NextResponse('Required field is missing!', { status: 400 });
        }

        const storeByUserId = prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        });

        if (!storeByUserId) {
            return new NextResponse('Unauthorize', { status: 403 });
        }

        const size = await prismadb.size.create({
            data: {
                name,
                value,
                storeId: params.storeId
            }
        });

        return NextResponse.json(size);
    } catch (error) {
        console.log('[SIZE_POST]', error);
        return new NextResponse('Internal error', { status: 500 });
    };
};

export async function GET(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {

        if (!params.storeId) {
            return new NextResponse('Required field is missing!', { status: 400 });
        }

        const sizeList = prismadb.size.findMany({
            where: {
                storeId: params.storeId
            }
        });
        
        return NextResponse.json(sizeList);
    } catch (error) {
        console.log('[SIZE_GET]', error);
        return new NextResponse('Internal error', { status: 500 });
    };
};