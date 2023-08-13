'use client';

import { Heading } from "@/component/content-header/content-heading";
import { Button, Col, Divider } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { useParams, useRouter } from "next/navigation";
import { Billboard, Category } from "@prisma/client";
import { CategoryTable } from "./category-table";
import { AddCategoryModal } from "./add-category-moda";
import { useRef } from "react";

export const CategoryClient = ({
    categoryList,
    billboardList
}: {
    categoryList: Category[],
    billboardList: Billboard[]
}) => {
    const router = useRouter();
    const params = useParams();
    const addCategoryModalRef = useRef<any>(null);

    return (
        <>
            <div className="page-header-wrapper">
                <Heading title={`Category (${categoryList.length})`} description="Manage category for your store" />
                <Button onClick={() => addCategoryModalRef.current?.open()} size="large" type="primary"><PlusOutlined /> Add category</Button>
                <AddCategoryModal billboardList={billboardList} ref={addCategoryModalRef} />
            </div>
            <Divider />
            <CategoryTable data={categoryList} billboardList={billboardList} />
        </>
    );
}