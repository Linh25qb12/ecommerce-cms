'use client';

import { Heading } from "@/component/content-header/content-heading";
import { Button, Col, Divider } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { Billboard } from "@prisma/client";
import { BillboardTable } from "./billboard-table";
import { useRef } from "react";
import { AddBillboardModal } from "./add-billboard-modal";
import { APIAlert } from "@/component/api-alert/api-alert";
import { useOrigin } from "@/hook/useOrigin";
import { useParams } from "next/navigation";

export const BillboardClient = ({ billboardList }: {    
    billboardList: Billboard[]
}) => {
    const addBillboardModalRef = useRef<any>(null);
    const origin = useOrigin();
    const params = useParams();
    const baseApi = `${origin}/api/${params.storeId}/billboard`;

    return (
        <div>
            <div className="page-header-wrapper">
                <Heading title={'Billboard List'} description="Manage billboard for your store" />
                <Button onClick={() => addBillboardModalRef.current?.open()} size="large" type="primary"><PlusOutlined /> Add billboard</Button>
                <AddBillboardModal ref={addBillboardModalRef} />
            </div>
            <Divider />
            <BillboardTable data={billboardList} />
            <Divider />
            <Heading title={'Billboard API'} description="Manage billboard API for your store" />
            <APIAlert title='GET (Billboard List)   ' description={baseApi} apiStatus="public"/>
            <APIAlert title='POST (New billboard)' description={baseApi} apiStatus="admin"/>    
            <APIAlert title='GET (Specific billboard)' description={`${baseApi}/{id}`} apiStatus="public"/>
            <APIAlert title='PATCH (Specific billboard)' description={`${baseApi}/{id}`} apiStatus="admin"/>
            <APIAlert title='DELETE (Specific billboard)' description={`${baseApi}/{id}`} apiStatus="admin"/>
        </div>
    );
}