'use client';

import React, { useImperativeHandle, useState } from "react";
import { Button, Form, Input, Modal, notification, Select, Spin } from "antd";
import { InfoCircleOutlined } from '@ant-design/icons';
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

export const AddSizeModal = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const params = useParams()
    const [refesh, setRefresh] = useState(0);

    useImperativeHandle(ref, () => {
        return {
            open: () => {
                setVisible(true);
            }
        };
    }, []);

    const onFinish = async (values: any) => {
        try {
            setLoading(true);
            await axios.post(`/api/${params.storeId}/size`, values);

            notification.success({
                message: 'size created success',
                placement: "bottomRight",
                duration: 2
            })
            router.refresh();
        } catch (error) {
            notification.error({
                message: 'Somthing went wrong!',
                description: 'Please check and try again.',
                placement: "bottomRight",
                duration: 2
            })
        } finally {
            setLoading(false);
            setRefresh(prev => prev + 1);
            onCancle();
        }
    };


    const onCancle = () => {
        setVisible(false);
    };

    return (
        <>
            <Modal
                title='Edit size'
                className="footless-modal"
                centered
                open={visible}
                onCancel={onCancle}
                footer={[
                    <Button key="back" disabled={loading} onClick={onCancle}>
                        Return
                    </Button>,
                    <Button form="create-size-form" loading={loading} key="submit" type="primary" htmlType="submit">
                        Submit
                    </Button>,
                ]}
            >
                <Spin spinning={loading}>
                    <Form
                        key={refesh}
                        requiredMark='optional'
                        layout="vertical"
                        name="basic"
                        id="create-size-form"
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            label={<b>Size name</b>}
                            name="name"
                            rules={[{ required: true, message: 'Please input your size name!' }]}
                            tooltip={{ title: 'Required field', icon: <InfoCircleOutlined /> }}
                        >
                            <Input placeholder="Size name" size="large" />
                        </Form.Item>
                        <Form.Item
                            label={<b>Size value</b>}
                            name="value"
                            rules={[{ required: true, message: 'Please input your size value!' }]}
                            tooltip={{ title: 'Required field', icon: <InfoCircleOutlined /> }}
                        >
                            <Input placeholder="Size value" size="large" />
                        </Form.Item>
                    </Form>
                </Spin>
            </Modal>
        </>
    );
});