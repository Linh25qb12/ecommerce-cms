'use client';

import { Heading } from "@/component/content-header/content-heading";
import { Button, Col, Divider } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { useParams, useRouter } from "next/navigation";
import { Billboard, Category, Size } from "@prisma/client";
import { SizeTable } from "./size-table";
import { AddSizeModal } from "./add-size-modal";
import { useRef } from "react";

export const SizeClient = ({
    sizeList,
}: {
    sizeList: Size[],
}) => {
    const addSizeModalRef = useRef<any>(null);

    return (
        <>
            <div className="page-header-wrapper">
                <Heading title={`Category (${sizeList.length})`} description="Manage category for your store" />
                <Button onClick={() => addSizeModalRef.current?.open()} size="large" type="primary"><PlusOutlined /> Add category</Button>
                <AddSizeModal ref={addSizeModalRef} />
            </div>
            <Divider />
            <SizeTable data={sizeList} />
        </>
    );
}