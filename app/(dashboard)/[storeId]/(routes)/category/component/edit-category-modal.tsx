'use client';

import React, { useImperativeHandle, useState } from "react";
import { Button, Form, Input, Modal, notification, Select, Spin } from "antd";
import { InfoCircleOutlined } from '@ant-design/icons';
import axios from "axios";
import { Billboard, Category } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

export const EditCategoryModal = React.forwardRef(({
    initialData,
    billboardList
}: {
    initialData: Category,
    billboardList: Billboard[]
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
        try {
            setLoading(true);
            await axios.patch(`/api/${params.storeId}/category/${initialData.id}`, values);

            notification.success({
                message: 'Category updated success',
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
                title='Create Category'
                className="footless-modal"
                centered
                open={visible}
                onCancel={onCancle}
                footer={[
                    <Button key="back" disabled={loading} onClick={onCancle}>
                        Return
                    </Button>,
                    <Button form="edit-category-form" loading={loading} key="submit" type="primary" htmlType="submit">
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
                        id="edit-category-form"
                        onFinish={onFinish}
                        autoComplete="off"
                        initialValues={initialData}
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