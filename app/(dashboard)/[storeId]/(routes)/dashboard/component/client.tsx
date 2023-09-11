'use client'

import { Heading } from "@/component/content-header/content-heading";
import { DeployButton } from "@/component/deploy-button/deploy-button";
import { useOrigin } from "@/hook/useOrigin";
import { MoreOutlined, EditOutlined, DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Divider, Dropdown, MenuProps, Modal, Spin, notification } from "antd";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { EditStoreModal } from "./edit-store-modal";

export const DashboardClient = ({
    storeId,
    storeName,
    connectId,
}: {
    storeId: string,
    storeName: string,
    connectId: string
}) => {

    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const params = useParams();
    const editStoreModalRef = useRef<any>(null);

    const handleDeleteStore = async () => {
        Modal.confirm({
            title: 'Delete store',
            icon: <ExclamationCircleFilled />,
            content: (
                <p>Are you sure you want to delete this store?<br /> This action cannot be undone. </p>
            ),
            onOk: async () => {
                try {
                    setLoading(true)
                    await axios.delete(`/api/store/${params.storeId}`);
                    notification.success({
                        message: 'Delete store success!',
                        placement: "bottomRight",
                        duration: 2
                    })
                    router.push('/');
                } catch (error) {
                    notification.error({
                        message: 'Somthing went wrong!',
                        description: 'Make sure you removed all products and categories first.',
                        placement: "bottomRight",
                        duration: 2
                    })
                } finally {
                    router.refresh();
                    setLoading(false);
                }
            },
        });
    };

    const items: MenuProps['items'] = [
        {
            key: 'Edit',
            label: (<p onClick={() => editStoreModalRef.current.open()}>Edit store name</p>),
            icon: <EditOutlined />
        },
        {
            key: 'Remove',
            label: (<p onClick={() => handleDeleteStore()}>Remove store</p>),
            danger: true,
            icon: <DeleteOutlined />
        }
    ]
    return (
        <Spin spinning={loading}>
            <div className="page-header-wrapper">
                <Heading title={'Dashboard'} description={`Overview and setting of ${storeName} store`} />
                <div className="functional-group-btn">
                    <DeployButton storeId={storeId} storeName={storeName} connectId={connectId} />
                    <Dropdown menu={{ items }}>
                        <Button style={{ padding: '0 12px', marginLeft: 5 }} size="large" type="dashed" ><MoreOutlined style={{ fontWeight: 900 }} /></Button>
                    </Dropdown>
                </div>
            </div>
            <EditStoreModal initialData={storeName} ref={editStoreModalRef} />
            <Divider />
        </Spin>
    );
}