'use client';

import { Heading } from "@/component/content-header/content-heading";
import { Button, Col, Divider } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { Billboard } from "@prisma/client";
import { BillboardTable } from "./billboard-table";
import { useRef } from "react";
import { AddBillboardModal } from "./add-billboard-modal";

export const BillboardClient = ({ billboardList }: {
    billboardList: Billboard[]
}) => {
    const addBillboardModalRef = useRef<any>(null);

    return (
        <>
            <div className="page-header-wrapper">
                <Heading title={`Billboards (${billboardList.length})`} description="Manage billboard for your store" />
                <Button onClick={() => addBillboardModalRef.current?.open()} size="large" type="primary"><PlusOutlined /> Add billboard</Button>
                <AddBillboardModal ref={addBillboardModalRef} />
            </div>
            <Divider />
            <BillboardTable data={billboardList} />
        </>
    );
}