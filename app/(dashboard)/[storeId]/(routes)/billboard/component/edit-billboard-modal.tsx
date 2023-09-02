'use client';

import React, { useImperativeHandle, useState, useEffect } from "react";
import { Billboard } from "@prisma/client";
import { Button, Col, Divider, Form, Input, Modal, Spin, notification, Alert, Tag } from "antd";
import { InfoCircleOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { ImageUploader } from "@/component/field/image-upload";

export const EditBillboardModal = React.forwardRef((props, ref) => {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const params = useParams();
    const [initialData, setInitialData] = useState<Billboard>();
    const [createBillboardForm] = Form.useForm();
    const imageUrl = Form.useWatch('imageUrl', createBillboardForm);
    const [visible, setVisible] = useState<boolean>(false);

    useImperativeHandle(ref, () => {
        return {
            open: (recordData: any) => {
                setInitialData(recordData);
                createBillboardForm.setFieldsValue(recordData)
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
                        form={createBillboardForm}
                        requiredMark='optional'
                        layout="vertical"
                        name="basic"
                        id="edit-billboard-form"
                        onFinish={onFinish}
                        autoComplete="off"
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