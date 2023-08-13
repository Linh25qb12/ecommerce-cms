'use client';

import React, { useImperativeHandle, useState } from "react";
import { useStoreModal } from "@/hook/useStoreModal";
import { Button, Form, Input, Modal, notification, Select, Spin } from "antd";
import { InfoCircleOutlined } from '@ant-design/icons';
import axios from "axios";
import { Billboard } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

export const AddCategoryModal = React.forwardRef(({
    billboardList
}: {
    billboardList: Billboard[]
}, ref) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const params = useParams()

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
            await axios.post(`/api/${params.storeId}/category`, values);

            notification.success({
                message: 'Category created success',
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

        }
    };


    const onCancle = () => {
        setVisible(false);
    };

    return (
        <>
            <Modal
                title='Create Category'
                className="footless-modal"
                centered
                open={visible}
                onCancel={onCancle}
                footer={[
                    <Button key="back" disabled={loading} onClick={onCancle}>
                        Return
                    </Button>,
                    <Button form="create-category-form" loading={loading} key="submit" type="primary" htmlType="submit">
                        Submit
                    </Button>,
                ]}
            >
                <Spin spinning={loading}>
                    <Form
                        requiredMark='optional'
                        layout="vertical"
                        name="basic"
                        id="create-category-form"
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            label={<b>Category name</b>}
                            name="name"
                            rules={[{ required: true, message: 'Please input your category name!' }]}
                            tooltip={{ title: 'Required field', icon: <InfoCircleOutlined /> }}
                        >
                            <Input placeholder="Category name" size="large" />
                        </Form.Item>
                        <Form.Item
                            label={<b>Billboard</b>}
                            name="billboardId"
                            rules={[{ required: true, message: 'Please select category billboard!' }]}
                            tooltip={{ title: 'Required field', icon: <InfoCircleOutlined /> }}
                        >
                            <Select
                                placeholder="Billboard name"
                                size="large"
                                options={billboardList.map((billboard: Billboard) => {
                                    return {
                                        label: billboard.label,
                                        value: billboard.id,
                                    }
                                })}
                            />
                        </Form.Item>
                    </Form>
                </Spin>
            </Modal>
        </>
    );
});