'use client';

import { Heading } from "@/component/content-header/content-heading";
import { Divider } from "antd";
import { Order } from "@prisma/client";
import { OrderTable } from "./order-table";

export const OrderClient = ({
    orderList,
}: {
    orderList: Order[],
}) => {

    return (
        <>
            <div className="page-header-wrapper">
                <Heading title={`Order (${orderList.length})`} description="Manage order for your store" />
            </div>
            <Divider />
            <OrderTable data={orderList} />
        </>
    );
}