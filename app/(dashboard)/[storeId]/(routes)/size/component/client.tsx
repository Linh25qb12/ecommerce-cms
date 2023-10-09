'use client';

import { Heading } from "@/component/content-header/content-heading";
import { Button, Col, Divider } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { useParams, useRouter } from "next/navigation";
import { Size } from "@prisma/client";
import { SizeTable } from "./size-table";
import { AddSizeModal } from "./add-size-modal";
import { useRef } from "react";
import { useOrigin } from "@/hook/useOrigin";
import { APIAlert } from "@/component/api-alert/api-alert";

export const SizeClient = ({
    sizeList,
}: {
    sizeList: Size[],
}) => {
    const addSizeModalRef = useRef<any>(null);
    const origin = useOrigin();
    const params = useParams();
    const baseApi = `${origin}/api/${params.storeId}/size`;

    return (
        <>
            <div className="page-header-wrapper">
                <Heading title={`Size (${sizeList.length})`} description="Manage size for your store" />
                <Button onClick={() => addSizeModalRef.current?.open()} size="large" type="primary"><PlusOutlined /> Add size</Button>
                <AddSizeModal ref={addSizeModalRef} />
            </div>
            <Divider />
            <SizeTable data={sizeList} />
            <Divider />
            <Heading title={'Category API'} description="Manage size API for your store" />
            <APIAlert title='GET (Category List)   ' description={baseApi} apiStatus="public"/>
            <APIAlert title='POST (New size)' description={baseApi} apiStatus="admin"/>    
            <APIAlert title='GET (Specific size)' description={`${baseApi}/{id}`} apiStatus="public"/>
            <APIAlert title='PATCH (Specific size)' description={`${baseApi}/{id}`} apiStatus="admin"/>
            <APIAlert title='DELETE (Specific size)' description={`${baseApi}/{id}`} apiStatus="admin"/>
        </>
    );
}