import { Heading } from "@/component/content-header/content-heading";
import { DeployButton } from "@/component/deploy-button/deploy-button";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { Button, Divider, Dropdown, MenuProps } from "antd";
import { NextResponse } from "next/server";
import { MoreOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { redirect } from "next/navigation";

const FirstPage = async ({
    params,
}: {
    params: {
        storeId: string,
    },
}) => {

    redirect(`${params.storeId}/dashboard`);
}

export default FirstPage;