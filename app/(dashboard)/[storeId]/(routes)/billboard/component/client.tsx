'use client';

import { Heading } from "@/component/content-header/content-heading";
import { Button, Divider } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { useParams, useRouter } from "next/navigation";

export const BillboardClient = () => {
    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="page-header-wrapper">
                <Heading title="Billboards (0)" description="Manage billboard for your store" />
                <Button onClick={() => router.push(`/${params.storeId}/billboard/new`)} size="large" type="primary"><PlusOutlined /> Add billboard</Button>
            </div>
            <Divider />
        </>
    );
}