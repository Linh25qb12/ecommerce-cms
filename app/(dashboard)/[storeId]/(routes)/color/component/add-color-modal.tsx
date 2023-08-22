'use client';

import React, { useImperativeHandle, useState } from "react";
import { Button, ColorPicker, Form, Input, Modal, notification, Select, Spin } from "antd";
import { InfoCircleOutlined } from '@ant-design/icons';
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

export const AddColorModal = React.forwardRef((props, ref) => {
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
        const formatObject = {
            ...values,
            value: `#${values.value.toHex()}`,
        }
        try {
            setLoading(true);
            await axios.post(`/api/${params.storeId}/color`, formatObject);

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
                title='Add color'
                className="footless-modal"
                centered
                open={visible}
                onCancel={onCancle}
                footer={[
                    <Button key="back" disabled={loading} onClick={onCancle}>
                        Return
                    </Button>,
                    <Button form="create-color-form" loading={loading} key="submit" type="primary" htmlType="submit">
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
                        id="create-color-form"
                        onFinish={onFinish}
                        autoComplete="off"
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
                             <ColorPicker format="hex" showText />
                        </Form.Item>
                    </Form>
                </Spin>
            </Modal>
        </>
    );
});