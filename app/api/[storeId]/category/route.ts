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
        const { name, billboardId } = body;

        if (!userId) {
            return new NextResponse('Unauthenticated', { status: 401 });
        }

        if (!name || !billboardId || !params.storeId) {
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

        const category = await prismadb.category.create({
            data: {
                name,
                billboardId,
                storeId: params.storeId
            }
        });

        return NextResponse.json(category);
    } catch (error) {
        console.log('[CATEGORY_POST]', error);
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

        const categoryList = prismadb.category.findMany({
            where: {
                storeId: params.storeId
            }
        });
        
        return NextResponse.json(categoryList);
    } catch (error) {
        console.log('[CATEGORY_GET]', error);
        return new NextResponse('Internal error', { status: 500 });
    };
};