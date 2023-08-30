'use client';

import { Heading } from "@/component/content-header/content-heading";
import { Button, Col, Divider } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { Category, Color, Product, Size } from "@prisma/client";
import { ProductTable } from "./product-table";
import { useRef } from "react";
import { AddProductModal } from "./add-product-modal";
import { APIAlert } from "@/component/api-alert/api-alert";
import { useOrigin } from "@/hook/useOrigin";
import { useParams } from "next/navigation";

export const ProductClient = ({
    productList,
    categoryList,
    sizeList,
    colorList
}: {
    productList: Product[],
    categoryList: Category[],
    sizeList: Size[],
    colorList: Color[],
}) => {
    const addProductModalRef = useRef<any>(null);
    const origin = useOrigin();
    const params = useParams();
    const baseApi = `${origin}/api/${params.storeId}/product`;

    return (
        <>
            <div className="page-header-wrapper">
                <Heading title={'Product List'} description="Manage product for your store" />
                <Button onClick={() => addProductModalRef.current?.open()} size="large" type="primary"><PlusOutlined /> Add product</Button>
                <AddProductModal
                    categoryList={categoryList}
                    sizeList={sizeList}
                    colorList={colorList}
                    ref={addProductModalRef}
                />
            </div>
            <Divider />
            <ProductTable data={productList} />
            <Divider />
            <Heading title={'Product API'} description="Manage product API for your store" />
            <APIAlert title='GET (Product List)   ' description={baseApi} apiStatus="public" />
            <APIAlert title='POST (New product)' description={baseApi} apiStatus="admin" />
            <APIAlert title='GET (Specific product)' description={`${baseApi}/{id}`} apiStatus="public" />
            <APIAlert title='PATCH (Specific product)' description={`${baseApi}/{id}`} apiStatus="admin" />
            <APIAlert title='DELETE (Specific product)' description={`${baseApi}/{id}`} apiStatus="admin" />
        </>
    );
}