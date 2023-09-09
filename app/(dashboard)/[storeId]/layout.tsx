import { Navbar } from "@/component/navbar/navbar";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation";
import './dashboard.scss';
import { stripe } from "@/lib/stripe";

export default async function DashboardLayout({
    children,
    params,
}: {
    children: React.ReactNode,
    params: {
        storeId: string,
    }
}) {
    const { userId } = auth();

    if (!userId) {
        redirect('/sign-in');
    }

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId,
        }
    });

    if (!store) {
        redirect('/');
    };

    // const account = await stripe.accounts.create({
    //     type: 'standard',
    // });

    // const accountLink = await stripe.accountLinks.create({
    //     account: 'acct_1NoOhoC44JPpVxTk',
    //     refresh_url: 'http://localhost:3000/',
    //     return_url: 'http://localhost:3000/',
    //     type: 'account_onboarding',
    // });


    
    const storeList = await prismadb.store.findMany({
        where: {
            userId,
        }
    });
    
    // redirect(accountLink.url);

    return (
        <>
            <Navbar storeList={storeList} />
            <div className="dashboard-wrapper">
                {children}
            </div>
        </>
    );
}