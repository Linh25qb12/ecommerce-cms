'use client';

import { Heading } from "@/component/content-header/content-heading";
import { Button, Col, Divider } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { useParams, useRouter } from "next/navigation";
import { Color } from "@prisma/client";
import { ColorTable } from "./color-table";
import { AddColorModal } from "./add-color-modal";
import { useRef } from "react";
import { useOrigin } from "@/hook/useOrigin";
import { APIAlert } from "@/component/api-alert/api-alert";

export const ColorClient = ({
    colorList,
}: {
    colorList: Color[],
}) => {
    const addColorModalRef = useRef<any>(null);
    const origin = useOrigin();
    const params = useParams();
    const baseApi = `${origin}/api/${params.storeId}/color`;

    return (
        <>
            <div className="page-header-wrapper">
                <Heading title={`Color (${colorList.length})`} description="Manage color for your store" />
                <Button onClick={() => addColorModalRef.current?.open()} size="large" type="primary"><PlusOutlined /> Add color</Button>
                <AddColorModal ref={addColorModalRef} />
            </div>
            <Divider />
            <ColorTable data={colorList} />
            <Divider />
            <Heading title={'Color API'} description="Manage color API for your store" />
            <APIAlert title='GET (Color List)   ' description={baseApi} apiStatus="public"/>
            <APIAlert title='POST (New color)' description={baseApi} apiStatus="admin"/>    
            <APIAlert title='GET (Specific color)' description={`${baseApi}/{id}`} apiStatus="public"/>
            <APIAlert title='PATCH (Specific color)' description={`${baseApi}/{id}`} apiStatus="admin"/>
            <APIAlert title='DELETE (Specific color)' description={`${baseApi}/{id}`} apiStatus="admin"/>
        </>
    );
}