'use client';

import React, { useImperativeHandle, useState } from "react";
import { Button, Checkbox, Col, Form, Input, InputNumber, Modal, Row, Select, Spin, notification } from "antd";
import { InfoCircleOutlined } from '@ant-design/icons';
import { useParams, useRouter } from "next/navigation";
import { MultiImageUploader } from "@/component/field/image-upload";
import axios from "axios";
import { Category, Color, Product, Size } from "@prisma/client";

export const AddProductModal = React.forwardRef(({
    colorList,
    categoryList,
    sizeList,
}: {
    categoryList: Category[],
    sizeList: Size[],
    colorList: Color[],
}, ref) => {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const params = useParams();
    const [createProductForm] = Form.useForm();
    const images: string[] = Form.useWatch('images', createProductForm) ?? [];
    const [visible, setVisible] = useState<boolean>(false);

    useImperativeHandle(ref, () => {
        return {
            open: () => {
                setVisible(true);
            }
        };
    }, []);

    const onCancle = () => {
        setVisible(false);
    };

    const onFinish = async (values: Product) => {
        try {
            setLoading(true);
            await axios.post(`/api/${params.storeId}/product`, values);
            notification.success({
                message: 'Product create successful',
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
            createProductForm.resetFields();
        }
    };

    const onImageChange = (url: string) => {
        createProductForm.setFieldValue('images', [...images, url]);
    }

    const onRemoveImage = (url: string) => {
        createProductForm.setFieldValue('images', images.filter((image: string) => image !== url));
    }

    return (
        <>
            <Modal
                title='Add product'
                className="footless-modal"
                centered
                open={visible}
                onCancel={onCancle}
                footer={[
                    <Button key="back" disabled={loading} onClick={onCancle}>
                        Return
                    </Button>,
                    <Button form="add-product-form" loading={loading} key="submit" type="primary" htmlType="submit">
                        Submit
                    </Button>,
                ]}
            >
                <Spin spinning={loading}>
                    <Form
                        form={createProductForm}
                        requiredMark='optional'
                        layout="vertical"
                        name="basic"
                        id="add-product-form"
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            label={<b>Product background</b>}
                            name='images'
                            rules={[{ required: true, message: 'Please select your product background!' }]}
                            tooltip={{ title: 'Required field', icon: <InfoCircleOutlined /> }}
                        >
                            <MultiImageUploader
                                value={images}
                                disabled={loading}
                                onChange={(url: string) => onImageChange(url)}
                                onRemove={(url: string) => onRemoveImage(url)}
                            />
                        </Form.Item>
                        <Row gutter={8}>
                            <Col span={12} >
                                <Form.Item
                                    label={<b>Product name</b>}
                                    name="name"
                                    rules={[{ required: true, message: 'Please input your product name!' }]}
                                    tooltip={{ title: 'Required field', icon: <InfoCircleOutlined /> }}
                                >
                                    <Input placeholder="Product name" size="large" />
                                </Form.Item>
                            </Col>
                            <Col span={12} >
                                <Form.Item
                                    label={<b>Product price</b>}
                                    name="price"
                                    rules={[{ required: true, message: 'Please input your product price!' }]}
                                    tooltip={{ title: 'Required field', icon: <InfoCircleOutlined /> }}
                                >
                                    <InputNumber style={{ width: '100%' }} prefix='$' placeholder="9.99" size="large" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item
                            label={<b>Category</b>}
                            name="categoryId"
                            rules={[{ required: true, message: 'Please select product category!' }]}
                            tooltip={{ title: 'Required field', icon: <InfoCircleOutlined /> }}
                        >
                            <Select
                                placeholder="Category"
                                size="large"
                                options={categoryList.map((category: Category) => {
                                    return {
                                        label: category.name,
                                        value: category.id,
                                    }
                                })}
                            />
                        </Form.Item>
                        <Row gutter={8}>
                            <Col span={12}>
                                <Form.Item
                                    label={<b>Color</b>}
                                    name="colorId"
                                    rules={[{ required: true, message: 'Please select product color!' }]}
                                    tooltip={{ title: 'Required field', icon: <InfoCircleOutlined /> }}
                                >
                                    <Select
                                        placeholder="Category"
                                        size="large"
                                        options={colorList.map((color: Color) => {
                                            return {
                                                label: color.name,
                                                value: color.id,
                                            }
                                        })}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label={<b>Size</b>}
                                    name="sizeId"
                                    rules={[{ required: true, message: 'Please select product size!' }]}
                                    tooltip={{ title: 'Required field', icon: <InfoCircleOutlined /> }}
                                >
                                    <Select
                                        placeholder="Size"
                                        size="large"
                                        options={sizeList.map((size: Size) => {
                                            return {
                                                label: size.name,
                                                value: size.id,
                                            }
                                        })}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={8}>
                            <Col span={12}>
                                <Form.Item
                                    label={<b>Featured</b>}
                                    name="isFeatured"
                                    tooltip={{ title: 'This product will appear on the home page.', icon: <InfoCircleOutlined /> }}
                                    valuePropName="checked"
                                    initialValue={false}
                                >
                                    <Checkbox>Featured</Checkbox>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label={<b>Archived</b>}
                                    name="isArchived"
                                    tooltip={{ title: 'This product will not appear anywhere in the store.', icon: <InfoCircleOutlined /> }}
                                    valuePropName="checked"
                                    initialValue={false}
                                >
                                    <Checkbox>Archived</Checkbox>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Spin>
            </Modal>
        </>
    );
});