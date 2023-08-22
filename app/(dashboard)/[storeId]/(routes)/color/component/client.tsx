'use client';

import { Heading } from "@/component/content-header/content-heading";
import { Button, Col, Divider } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { useParams, useRouter } from "next/navigation";
import { Color } from "@prisma/client";
import { ColorTable } from "./color-table";
import { AddColorModal } from "./add-color-modal";
import { useRef } from "react";

export const ColorClient = ({
    colorList,
}: {
    colorList: Color[],
}) => {
    const addColorModalRef = useRef<any>(null);

    return (
        <>
            <div className="page-header-wrapper">
                <Heading title={`Color (${colorList.length})`} description="Manage color for your store" />
                <Button onClick={() => addColorModalRef.current?.open()} size="large" type="primary"><PlusOutlined /> Add color</Button>
                <AddColorModal ref={addColorModalRef} />
            </div>
            <Divider />
            <ColorTable data={colorList} />
        </>
    );
}