import prismadb from "@/lib/prismadb";
import { SizeClient } from "./component/client";

const SizePage = async ({ params }: {
    params: { storeId: string }
}) => {

    const sizeList = await prismadb.size.findMany({
        where: {
            storeId: params.storeId,
        },
        orderBy: {
            createdAt: 'desc',
        }
    })

    return (
        <>
            <SizeClient sizeList={sizeList} />
        </>
    );
}

export default SizePage;