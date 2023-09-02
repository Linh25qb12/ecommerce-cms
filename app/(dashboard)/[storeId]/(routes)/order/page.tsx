import prismadb from "@/lib/prismadb";
import { OrderClient } from "./component/client";

const OrderPage = async ({ params }: {
    params: { storeId: string }
}) => {

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


    return (
        <>
            <OrderClient orderList={orderList} />
        </>
    );
}

export default OrderPage;