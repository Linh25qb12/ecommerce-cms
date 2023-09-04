import { DeployButton } from "@/component/deploy-button/deploy-button";
import prismadb from "@/lib/prismadb";


const DashboardPage = async ({
    params,
}: {
    params: {
        storeId: string,
    },
}) => {

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
        }
    });

    return (  
        <div>
            Active store: {store?.name}
            <DeployButton />
        </div>
    );
}   
 
export default DashboardPage;