import prismadb from "@/lib/prismadb";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: { storeId: string } }
) {
    try {
        const orderList = await prismadb.order.findMany({
            where: {
                storeId: params.storeId,
                isPaid: true,
            },
            include: {
                orderItems: {
                    include: {
                        product: {
                            include: {
                                images: true,
                                color: true,
                                category: true,
                                size: true,
                            }
                        },
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
