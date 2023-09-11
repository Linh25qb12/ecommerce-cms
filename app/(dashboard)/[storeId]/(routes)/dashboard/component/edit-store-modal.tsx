'use client'

import { Button, Form, Input, Modal, Spin, notification } from "antd";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useImperativeHandle, useState } from "react";
import { InfoCircleOutlined } from '@ant-design/icons';

export const EditStoreModal = React.forwardRef(({
    initialData
}: {
    initialData: string
}, ref) => {

    useImperativeHandle(ref, () => {
        return {
            open: () => {
                setVisible(true);
            }
        };
    }, []);

    const [visible, setVisible] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const params = useParams()
    const [refesh, setRefresh] = useState(0);

    const onCancle = () => {
        setVisible(false);
    };

    const onFinish = async (values: any) => {
        try {
            setLoading(true);
            await axios.patch(`/api/store/${params.storeId}`, values);
            notification.success({
                message: 'Update store success!',
                placement: "bottomRight",
                duration: 2
            })
        } catch (error) {
            notification.error({
                message: 'Somthing went wrong!',
                description: 'Please check and try again.',
                placement: "bottomRight",
                duration: 2
            })
        } finally {
            router.refresh();
            setLoading(false);
            onCancle();
        }
    };

    return (
        <>
            <Modal
                title='Edit Store Name'
                className="footless-modal"
                centered
                open={visible}
                onCancel={onCancle}
                footer={[
                    <Button key="back" disabled={loading} onClick={onCancle}>
                        Return
                    </Button>,
                    <Button form="edit-store-form" loading={loading} key="submit" type="primary" htmlType="submit">
                        Submit
                    </Button>,
                ]}
            >
                <Spin spinning={loading}>
                    <Form
                        requiredMark='optional'
                        layout="vertical"
                        name="basic"
                        id="edit-store-form"
                        onFinish={onFinish}
                        autoComplete="off"
                    >

                        <Form.Item
                            label={<b>Store name</b>}
                            name="name"
                            initialValue={initialData}
                            rules={[{ required: true, message: 'Please input your store name!' }]}
                            tooltip={{ title: 'Required field', icon: <InfoCircleOutlined /> }}
                        >
                            <Input placeholder="Store name" size="large" />
                        </Form.Item>
                    </Form>
                </Spin>
            </Modal>
        </>
    );
});