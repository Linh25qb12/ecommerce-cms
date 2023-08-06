import { Navbar } from "@/component/navbar/navbar";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
    params,
}: {
    children: React.ReactNode,
    params: {
        storeId: string,
    }
}) {
    const {userId} = auth();

    if(!userId) {
        redirect('/sign-in');
    }

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId,
        }
    });

    if(!store) {
        redirect('/');
    };

    const storeList = await prismadb.store.findMany({
        where: {
            userId,
        }
    });

    return (
        <>
            <Navbar storeList={storeList} />
            {children}
        </>
    ); 
}