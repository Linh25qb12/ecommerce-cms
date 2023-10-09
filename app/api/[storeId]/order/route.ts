import prismadb from "@/lib/prismadb";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: { storeId: string } }
) {
    try {
        const userId = req.nextUrl.searchParams.get("user_id") as string;
        console.log(params.storeId);
        const orderList = await prismadb.order.findMany({
            where: {
                storeId: params.storeId,
            },
            include: {
                orderItems: {
                    include: {
                        product: true,
                    }
                }
            },
            orderBy: {
                createdAt: 'desc',
            }
        })

        return NextResponse.json(orderList);
    } catch (error) {
        console.log('ORDER_GET', error);
    }
}
