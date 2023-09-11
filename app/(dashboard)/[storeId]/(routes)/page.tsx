import { redirect } from "next/navigation";

const FirstPage = async ({
    params,
}: {
    params: {
        storeId: string,
    },
}) => {

    redirect(`${params.storeId}/dashboard`);
}

export default FirstPage;