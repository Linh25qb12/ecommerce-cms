import { DeployButton } from "@/component/deploy-button/deploy-button";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


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
        <div>
            Active store: {store?.name}
            {(store && connectAccount.length > 0) && <DeployButton storeId={params.storeId} storeName={store.name} connectId={connectAccount[0].accountId} />}
        </div>
    );
}

export default DashboardPage;