'use client';

import { Heading } from "@/component/content-header/content-heading";
import { Billboard } from "@prisma/client";
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Form, Input, Modal, Spin, notification, Alert, Tag } from "antd";
import { useEffect, useState } from "react";
import { InfoCircleOutlined, ExclamationCircleFilled, CopyOutlined, CloudDownloadOutlined } from '@ant-design/icons';
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useOrigin } from "@/hook/useOrigin";
import { ImageUploader } from "@/component/field/image-upload";

export const BillboardForm = ({
    initialData,
}: {
    initialData: Billboard | null,
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const origin = useOrigin();
    const router = useRouter();
    const params = useParams();
    const [createBillboardForm] = Form.useForm();
    const imageUrl = Form.useWatch('imageUrl', createBillboardForm);

    console.log(imageUrl);

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

    const apiStatusMap = {
        public: 'Public',
        admin: 'Admin'
    }

    const apiColorMap = {
        admin: '#000000',
        public: '#bebebe'
    }

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
                    router.refresh();
                    router.push('/');
                } catch (error) {
                    notification.error({
                        message: 'Somthing went wrong!',
                        description: 'Make sure you removed all products and categories first.',
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
            await axios.patch(`/api/billboard/${params.billboardId}`, values);
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

    const description = `${origin}/api/${params.storeId}`;

    const onCopy = () => {
        navigator.clipboard.writeText(description);
        notification.success({
            message: 'API Route copied to the clipboard',
            placement: "bottomRight",
            duration: 2
        })
    }

    const onImageChange = (url: string) => {
        createBillboardForm.setFieldValue('imageURL', url);
    }

    return (
        <Spin spinning={loading}>
            <div className="setting-form-wrapper">
                <div className="page-header-wrapper">
                    <Heading title={billboardProp.title} description={billboardProp.description} />
                    {initialData && <Button onClick={handleDeleteStore} size="large" danger type="primary"><DeleteOutlined /></Button>}
                </div>
                <Divider />
                <Col span={4}>
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
                            imageUrl: '',
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
                </Col>
                <Divider />
                <Alert
                    style={{ background: 'white', border: '1px solid #d3d3d3' }}
                    message={<><b>Test&nbsp;&nbsp;<Tag color='#bebebe' style={{ borderRadius: 999999, padding: '1px 10px' }}>{apiStatusMap.public}</Tag></b></>}
                    description={<b><Tag style={{ color: 'black', fontSize: 14 }} color='#d3d3d3'>{description}</Tag></b>}
                    type="info"
                    action={
                        <Button onClick={onCopy} size='large' type="text">
                            <CopyOutlined />
                        </Button>
                    }
                    showIcon
                    icon={<CloudDownloadOutlined />}
                />
            </div>
        </Spin>
    );
}