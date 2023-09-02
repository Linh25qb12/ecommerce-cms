import prismadb from "@/lib/prismadb";
import { ColorClient } from "./component/client";

const ColorPage = async ({ params }: {
    params: { storeId: string }
}) => {

    const colorList = await prismadb.color.findMany({
        where: {
            storeId: params.storeId,
        },
        orderBy: {
            createdAt: 'desc',
        }
    })

    return (
        <>
            <ColorClient colorList={colorList} />
        </>
    );
}

export default ColorPage;