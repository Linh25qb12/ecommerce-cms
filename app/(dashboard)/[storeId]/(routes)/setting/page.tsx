import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { SettingForm } from "./component/setting-form";

const SettingPage = async ({ params }: {
    params: { storeId: string }
}) => {
    const {userId} = auth();

    if(!userId) {
        redirect('/sign-in');
    }

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId,
        }
    })
    
    if(!store) {
        redirect('/');
    }

    return (
        <div>
            <SettingForm initialData={store} />
        </div>
    );
}

export default SettingPage;