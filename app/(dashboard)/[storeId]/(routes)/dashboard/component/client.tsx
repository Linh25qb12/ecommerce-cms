'use client'

import { Heading } from "@/component/content-header/content-heading";
import { DeployButton } from "@/component/deploy-button/deploy-button";
import { MoreOutlined, EditOutlined, DeleteOutlined, ExclamationCircleFilled, CopyOutlined, WalletOutlined, FundOutlined, DropboxOutlined } from '@ant-design/icons';
import { Button, Card, Col, Divider, Dropdown, MenuProps, Modal, Row, Spin, notification } from "antd";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { EditStoreModal } from "./edit-store-modal";
import { Overview } from "@/component/overview/overview";
import { APIAlert } from "@/component/api-alert/api-alert";
import './component.scss';

export const DashboardClient = ({
    storeId,
    storeName,
    graphRevenue,
    totalRevenue,
    salesCount,
    stockCount
}: {
    storeId: string,
    storeName: string,
    graphRevenue: any,
    totalRevenue: any,
    salesCount: any,
    stockCount: any
}) => {

    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const params = useParams();
    const editStoreModalRef = useRef<any>(null);
    const baseApi = `${origin}/api/store`;

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

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        notification.success({
            message: 'Store ID copied to the clipboard',
            placement: "bottomRight",
            duration: 2
        })
    }

    const items: MenuProps['items'] = [
        {
            key: 'Edit',
            label: (<p onClick={() => editStoreModalRef.current.open()}>Edit store name</p>),
            icon: <EditOutlined />
        },
        {
            key: 'Copy',
            label: (<p onClick={() => onCopy(storeId)}>Copy store ID</p>),
            icon: <CopyOutlined />
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
                    <DeployButton storeId={storeId} storeName={storeName} />
                    <Dropdown menu={{ items }}>
                        <Button style={{ padding: '0 12px', marginLeft: 5 }} size="large" type="dashed" ><MoreOutlined style={{ fontWeight: 900 }} /></Button>
                    </Dropdown>
                </div>
            </div>
            <EditStoreModal initialData={storeName} ref={editStoreModalRef} />
            <Divider />
            <div className="store-card-group">
                <Row gutter={15}>
                    <Col span={8}>
                        <Card className="graph-card" size="small">
                            <div className="data-card-title">
                                <h4>Total Revenue</h4>
                                <WalletOutlined />
                            </div>
                            <p className="data-display-text">$ {totalRevenue}</p>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card className="graph-card" size="small">
                            <div className="data-card-title">
                                <h4>Sales</h4>
                                <FundOutlined />
                            </div>
                            <p className="data-display-text">+ {salesCount}</p>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card className="graph-card" size="small">
                            <div className="data-card-title">
                                <h4>Products in Stock</h4>
                                <DropboxOutlined />
                            </div>
                            <p className="data-display-text">{stockCount}</p>
                        </Card>
                    </Col>
                </Row>
            </div>
            <Card className="graph-card">
                <h2 className="graph-card-title">Overview</h2>
                <Overview totalRevenue={totalRevenue} data={graphRevenue} />
            </Card>
            <Divider />
            <Heading title={'Store API'} description="Manage store API" />
            <APIAlert title='GET (Specific store)' description={`${baseApi}`} apiStatus="public" />
            <APIAlert title='POST (New store)' description={baseApi} apiStatus="admin" />
            <APIAlert title='PATCH (Specific store)' description={`${baseApi}/{id}`} apiStatus="admin" />
            <APIAlert title='DELETE (Specific store)' description={`${baseApi}/{id}`} apiStatus="admin" />
        </Spin>
    );
}