import prismadb from "@/lib/prismadb";
import { ProductClient } from "./component/client";

const ProductPage = async ({ params }: {
    params: { storeId: string }
}) => {

    const productList = await prismadb.product.findMany({
        where: {
            storeId: params.storeId,
        },
        include: {
            category: true,
            size: true,
            color: true,
            images: true,
        },
        orderBy: {
            createdAt: 'desc',
        }
    })

    const categoryList = await prismadb.category.findMany({
        where: {
            storeId: params.storeId,
        }
    })

    const sizeList = await prismadb.size.findMany({
        where: {
            storeId: params.storeId,
        }
    })

    const colorList = await prismadb.color.findMany({
        where: {
            storeId: params.storeId,
        }
    })

    return (
        <>
            <ProductClient
                categoryList={categoryList}
                sizeList={sizeList}
                colorList={colorList}
                productList={productList}
            />
        </>
    );
}

export default ProductPage;