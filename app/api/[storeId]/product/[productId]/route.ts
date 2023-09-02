import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, productId: string } }
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const {
            name,
            price,
            categoryId,
            colorId,
            sizeId,
            images,
            isFeatured,
            isArchived
        } = body;

        if (!userId) {
            return new NextResponse('Unauthenticated', { status: 401 });
        }

        if (!name || !price || !categoryId || !colorId || !sizeId || !images || !params.storeId) {
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

        await prismadb.product.update({
            where: {
                id: params.productId
            },
            data: {
                name,
                price,
                categoryId,
                colorId,
                sizeId,
                images: {
                    deleteMany: {}
                },
                isArchived,
                isFeatured,
            }
        });

        const product = await prismadb.product.update({
            where: {
                id: params.productId,
            },
            data: {
                images: {
                    createMany: {
                        data: [
                            ...images.map((image: string) => {
                                return { url: image };
                            }),
                        ]
                    }
                }
            }
        })

        return NextResponse.json(product);

    } catch (error) {
        console.log('PRODUCT_PATCH]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string, productId: string } }
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        if (!params.productId) {
            return new NextResponse('Product ID is required!', { status: 400 });
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

        const product = await prismadb.product.deleteMany({
            where: {
                id: params.productId,
            },
        })

        return NextResponse.json(product);


    } catch (error) {
        console.log('PRODUCT_DELETE]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}

export async function GET(
    req: Request,
    { params }: { params: { productId: string } }
) {
    try {

        if (!params.productId) {
            return new NextResponse('Product ID is required!', { status: 400 });
        }

        const product = await prismadb.product.findUnique({
            where: {
                id: params.productId,
            },
            include: {
                images: true,
                category: true,
                color: true,
                size: true,
            },
        })

        return NextResponse.json(product);


    } catch (error) {
        console.log('[PRODUCT_GET]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}