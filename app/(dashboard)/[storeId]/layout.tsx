import { Navbar } from "@/component/navbar/navbar";
import prismadb from "@/lib/prismadb";
import { auth, currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";
import './dashboard.scss';

export default async function DashboardLayout({
    children,
    params,
}: {
    children: React.ReactNode,
    params: {
        storeId: string,
    }
}) {
    const user = await currentUser();
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

    const connectAccount = await prismadb.connect.findMany({
        where: {
            accountId: user?.id,
        }
    });

    if (connectAccount.length < 1) {
        const account = await stripe.accounts.create({
            type: 'standard',
            email: user?.emailAddresses[0].emailAddress,
            business_profile: {
            
            },

        });

        await prismadb.connect.create({
            data: {
                accountId: userId,
                connectId: account.id,
            }
        });

        const accountLink = await stripe.accountLinks.create({
            account: account.id,
            refresh_url: 'http://localhost:3000/',
            return_url: 'http://localhost:3000/',
            type: 'account_onboarding',
        });

        redirect(accountLink.url);
    }

    const storeList = await prismadb.store.findMany({
        where: {
            userId,
        }
    });

    return (
        <>
            <Navbar storeList={storeList} />
            <div className="dashboard-wrapper">
                {children}
            </div>
        </>
    );
}