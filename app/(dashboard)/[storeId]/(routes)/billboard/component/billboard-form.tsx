'use client';

import { Heading } from "@/component/content-header/content-heading";
import { Billboard } from "@prisma/client";
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Form, Input, Modal, Spin, notification, Alert, Tag } from "antd";
import { useState } from "react";
import { InfoCircleOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { ImageUploader } from "@/component/field/image-upload";

export const BillboardForm = ({
    initialData,
}: {
    initialData: Billboard | null,
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const params = useParams();
    const [createBillboardForm] = Form.useForm();
    const imageUrl = Form.useWatch('imageUrl', createBillboardForm);

    const billboardProp = initialData
        ? {
            title: 'Edit billboard',
            description: 'Edit your billboard information',
            message: 'Billboard update success',
            action: 'Save'
        }
        : {
            title: 'Create billboard',
            description: 'Add a new billboard',
            message: 'Billboard created success',
            action: 'Create'
        }

    const handleDeleteStore = async () => {
        Modal.confirm({
            title: 'Delete store',
            icon: <ExclamationCircleFilled />,
            content: (
                <p>Are you sure you want to delete this billboard?<br /> This action cannot be undone. </p>
            ),
            onOk: async () => {
                try {
                    setLoading(true)
                    await axios.delete(`/api//${params.storeId}/billboard/${params.billboardId}`);
                    notification.success({
                        message: 'Delete billboard success!',
                        placement: "bottomRight",
                        duration: 2
                    })
                    router.refresh();
                    router.push(`/${params.storeId}/billboard`);
                } catch (error) {
                    notification.error({
                        message: 'Somthing went wrong!',
                        description: 'Make sure you removed all categories using this billboard first.',
                        placement: "bottomRight",
                        duration: 2
                    })
                } finally {
                    setLoading(false);
                }
            },
        });
    };

    const onFinish = async (values: any) => {
        try {
            setLoading(true);
            if (initialData) {
                await axios.patch(`/api/${params.storeId}/billboard/${params.billboardId}`, values);
            } else {
                await axios.post(`/api/${params.storeId}/billboard`, values);
                window.location.assign(`/${params.storeId}/billboard`);
            }
            notification.success({
                message: billboardProp.message,
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

    const onImageChange = (url: string) => {
        createBillboardForm.setFieldValue('imageURL', url);
    }

    return (
        <Spin spinning={loading}>
            <Form
                form={createBillboardForm}
                requiredMark='optional'
                layout="vertical"
                name="basic"
                id="create-store-form"
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
                initialValues={{
                    labe: initialData ? initialData.label : '',
                    imageUrl: initialData ? initialData.imageUrl : '',
                }}
            >
                <Form.Item
                    label={<b>Billboard label</b>}
                    name="label"
                    initialValue={initialData?.label}
                    rules={[{ required: true, message: 'Please input your billboard label!' }]}
                    tooltip={{ title: 'Required field', icon: <InfoCircleOutlined /> }}
                >
                    <Input placeholder="Billboard label" size="large" />
                </Form.Item>
                <Form.Item
                    label={<b>Billboard background</b>}
                    name='imageUrl'
                    rules={[{ required: true, message: 'Please select your billboard background!' }]}
                    tooltip={{ title: 'Required field', icon: <InfoCircleOutlined /> }}
                >
                    <ImageUploader
                        value={imageUrl}
                        disabled={loading}
                        onChange={(url) => onImageChange(url)}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        {billboardProp.action}
                    </Button>
                </Form.Item>
            </Form>
        </Spin>
    );
}