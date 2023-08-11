'use client';

import { Heading } from "@/component/content-header/content-heading";
import { Button, Col, Divider } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { useParams, useRouter } from "next/navigation";
import { Billboard } from "@prisma/client";
import { BillboardTable } from "./billboard-table";

export const BillboardClient = ({ billboardList }: {
    billboardList: Billboard[]
}) => {
    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="page-header-wrapper">
                <Heading title={`Billboards (${billboardList.length})`} description="Manage billboard for your store" />
                <Button onClick={() => router.push(`/${params.storeId}/billboard/new`)} size="large" type="primary"><PlusOutlined /> Add billboard</Button>
            </div>
            <Divider />
            <BillboardTable data={billboardList} />
        </>
    );
}