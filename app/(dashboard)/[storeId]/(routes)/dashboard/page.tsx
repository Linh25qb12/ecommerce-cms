import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { DashboardClient } from "./component/client";

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

    const connectAccount = await prismadb.connect.findMany({
        where: {
            accountId: userId,
        }
    });

    return (
        <>
            {store && (connectAccount.length > 0) && <DashboardClient storeId={params.storeId} storeName={store.name} connectId={connectAccount[0].connectId} />}
        </>
    );
}

export default DashboardPage;