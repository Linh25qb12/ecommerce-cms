import prismadb from "@/lib/prismadb";
import { BillboardClient } from "./component/client";

const BillboardPage = async ({ params }: {
    params: { storeId: string }
}) => {

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
            <BillboardClient billboardList={billboardList}  />
        </>
    );
}

export default BillboardPage;