'use client';

import { useStoreModal } from "@/hook/useStoreModal";
import { Button, Form, Input, Modal, notification, Spin } from "antd";
import React, { useState } from "react";
import { InfoCircleOutlined } from '@ant-design/icons';
import axios from "axios";

export type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

export const CreateStoreModal = () => {
    const storeModal = useStoreModal();
    const [loading, setLoading] = useState<boolean>(false);

    const onFinish = async (values: any) => {
        try {
            setLoading(true);
            const response = await axios.post('/api/store', values);
            notification.success({
                message: 'Create store success!',
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
            setLoading(false);
        }
    };

    return (
        <>
            <Modal
                title='Create Store'
                centered
                open={storeModal.isOpen}
                onCancel={storeModal.onCancle}
                footer={[
                    <Button key="back" disabled={loading} onClick={storeModal.onCancle}>
                        Return
                    </Button>,
                    <Button form="create-store-form" loading={loading} key="submit" type="primary" htmlType="submit">
                        Submit
                    </Button>,
                ]}
            >
                <Spin spinning={loading}>
                    <Form
                        requiredMark='optional'
                        layout="vertical"
                        name="basic"
                        id="create-store-form"
                        onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item<FieldType>
                            label={<b>Store name</b>}
                            name="name"
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
};