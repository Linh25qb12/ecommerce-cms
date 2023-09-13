import prismadb from "@/lib/prismadb";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { DashboardClient } from "./component/client";
import { getGraphRevenue } from "@/action/getGraphRevenue";
import { getTotalRevenue } from "@/action/getTotalRevenue";
import { getSalesCount } from "@/action/getSaleCount";
import { getStockCount } from "@/action/getStockCount";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";

const DashboardPage = async ({
    params,
}: {
    params: {
        storeId: string,
    },
}) => {

    const { userId } = auth();

    if (!userId) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
        }
    });

    const totalRevenue = await getTotalRevenue(params.storeId);
    const graphRevenue = await getGraphRevenue(params.storeId);
    const salesCount = await getSalesCount(params.storeId);
    const stockCount = await getStockCount(params.storeId);

    return (
        <>
            {store &&
                <DashboardClient
                    graphRevenue={graphRevenue}
                    totalRevenue={totalRevenue}
                    salesCount={salesCount}
                    stockCount={stockCount}
                    storeId={params.storeId}
                    storeName={store.name}
                />}
        </>
    );
}

export default DashboardPage;