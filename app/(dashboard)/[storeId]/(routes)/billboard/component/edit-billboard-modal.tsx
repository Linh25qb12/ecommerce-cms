'use client';

import React, { useImperativeHandle, useState } from "react";
import { Billboard } from "@prisma/client";
import { Button, Col, Divider, Form, Input, Modal, Spin, notification, Alert, Tag } from "antd";
import { InfoCircleOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { ImageUploader } from "@/component/field/image-upload";

export const EditBillboardModal = React.forwardRef(({
    initialData,
}: {
    initialData: Billboard,
}, ref) => {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const params = useParams();
    const [createBillboardForm] = Form.useForm();
    const imageUrl = Form.useWatch('imageUrl', createBillboardForm);
    const [visible, setVisible] = useState<boolean>(false);
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
            await axios.patch(`/api/${params.storeId}/billboard/${initialData?.id}`, values);
            notification.success({
                message: 'Billboard update successful',
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

    const onImageChange = (url: string) => {
        createBillboardForm.setFieldValue('imageURL', url);
    }

    const onCancle = () => {
        setVisible(false);
        setRefresh(prev => prev + 1);
    };

    return (
        <>
            <Modal
                title='Edit billboard'
                className="footless-modal"
                centered
                open={visible}
                onCancel={onCancle}
                footer={[
                    <Button key="back" disabled={loading} onClick={onCancle}>
                        Return
                    </Button>,
                    <Button form="edit-billboard-form" loading={loading} key="submit" type="primary" htmlType="submit">
                        Submit
                    </Button>,
                ]}
                >
                <Spin spinning={loading}>
                    <Form
                        key={refresh}
                        form={createBillboardForm}
                        requiredMark='optional'
                        layout="vertical"
                        name="basic"
                        id="edit-billboard-form"
                        onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        initialValues={initialData}
                    >
                        <Form.Item
                            label={<b>Billboard label</b>}
                            name="label"
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
                    </Form>
                </Spin>
            </Modal>
        </>
    );
});