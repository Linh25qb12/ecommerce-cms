'use client';

import { Heading } from "@/component/content-header/content-heading";
import { Button, Col, Divider } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { useParams, useRouter } from "next/navigation";
import { Billboard, Category } from "@prisma/client";
import { CategoryTable } from "./category-table";
import { AddCategoryModal } from "./add-category-modal";
import { useRef } from "react";
import { APIAlert } from "@/component/api-alert/api-alert";
import { useOrigin } from "@/hook/useOrigin";

export const CategoryClient = ({
    categoryList,
    billboardList
}: {
    categoryList: Category[],
    billboardList: Billboard[]
}) => {
    const addCategoryModalRef = useRef<any>(null);
    const origin = useOrigin();
    const params = useParams();
    const baseApi = `${origin}/api/${params.storeId}/category`;

    return (
        <>
            <div className="page-header-wrapper">
                <Heading title={`Category (${categoryList.length})`} description="Manage category for your store" />
                <Button onClick={() => addCategoryModalRef.current?.open()} size="large" type="primary"><PlusOutlined /> Add category</Button>
                <AddCategoryModal billboardList={billboardList} ref={addCategoryModalRef} />
            </div>
            <Divider />
            <CategoryTable data={categoryList} billboardList={billboardList} />
            <Heading title={'Category API'} description="Manage category API for your store" />
            <APIAlert title='GET (Category List)   ' description={baseApi} apiStatus="public"/>
            <APIAlert title='POST (New category)' description={baseApi} apiStatus="admin"/>    
            <APIAlert title='GET (Specific category)' description={`${baseApi}/{id}`} apiStatus="public"/>
            <APIAlert title='PATCH (Specific category)' description={`${baseApi}/{id}`} apiStatus="admin"/>
            <APIAlert title='DELETE (Specific category)' description={`${baseApi}/{id}`} apiStatus="admin"/>
        </>
    );
}