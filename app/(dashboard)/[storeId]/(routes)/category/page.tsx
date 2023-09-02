import prismadb from "@/lib/prismadb";
import { CategoryClient } from "./component/client";

const CategoryPage = async ({ params }: {
    params: { storeId: string }
}) => {

    const categoryList = await prismadb.category.findMany({
        where: {
            storeId: params.storeId,
        },
        include: {
            billboard: true,
        },
        orderBy: {
            createdAt: 'desc',
        }
    })

    const billboardList = await prismadb.billboard.findMany({
        where: {
            storeId: params.storeId,
        },
        orderBy: {
            createAt: 'desc',
        }
    })

    return (
        <>
            <CategoryClient categoryList={categoryList} billboardList={billboardList}  />
        </>
    );
}

export default CategoryPage;