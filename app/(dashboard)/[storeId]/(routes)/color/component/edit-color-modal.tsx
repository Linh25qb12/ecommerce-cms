'use client';

import React, { useImperativeHandle, useState } from "react";
import { useStoreModal } from "@/hook/useStoreModal";
import { Button, ColorPicker, Form, Input, Modal, notification, Select, Spin } from "antd";
import { InfoCircleOutlined } from '@ant-design/icons';
import axios from "axios";
import { Color, Size } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

export const EditColorModal = React.forwardRef(({
    initialData,
}: {
    initialData: Color,
}, ref) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const params = useParams();

    const [refresh, setRefresh] = useState(0);

    useImperativeHandle(ref, () => {
        return {
            open: () => {
                setVisible(true);
            }
        };
    }, []);

    const onFinish = async (values: any) => {
        const formatObject = {
            ...values,
            value: `#${values.value.toHex()}`,
        }
        try {
            setLoading(true);
            await axios.patch(`/api/${params.storeId}/color/${initialData.id}`, formatObject);

            notification.success({
                message: 'Color updated success',
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
            onCancle();
        }
    };


    const onCancle = () => {
        setVisible(false);
        setRefresh(prev => prev + 1);
    };

    return (
        <>
            <Modal
                title='Create Color'
                className="footless-modal"
                centered
                open={visible}
                onCancel={onCancle}
                footer={[
                    <Button key="back" disabled={loading} onClick={onCancle}>
                        Return
                    </Button>,
                    <Button form="edit-color-form" loading={loading} key="submit" type="primary" htmlType="submit">
                        Submit
                    </Button>,
                ]}
            >
                <Spin spinning={loading}>
                    <Form
                        key={refresh}
                        requiredMark='optional'
                        layout="vertical"
                        name="basic"
                        id="edit-color-form"
                        onFinish={onFinish}
                        autoComplete="off"
                        initialValues={initialData}
                    >
                        <Form.Item
                            label={<b>Color name</b>}
                            name="name"
                            rules={[{ required: true, message: 'Please input your color name!' }]}
                            tooltip={{ title: 'Required field', icon: <InfoCircleOutlined /> }}
                        >
                            <Input placeholder="Color name" size="large" />
                        </Form.Item>
                        <Form.Item
                            label={<b>Color value</b>}
                            name="value"
                            rules={[{ required: true, message: 'Please input your color value!' }]}
                            tooltip={{ title: 'Required field', icon: <InfoCircleOutlined /> }}
                        >
                            <ColorPicker showText />
                        </Form.Item>
                    </Form>
                </Spin>
            </Modal>
        </>
    );
});