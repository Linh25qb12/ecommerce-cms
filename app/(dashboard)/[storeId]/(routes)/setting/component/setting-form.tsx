'use client';

import { Heading } from "@/component/content-header/content-heading";
import { Store } from "@prisma/client";
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Form, Input, Modal, Spin } from "antd";
import { useState } from "react";
import { InfoCircleOutlined } from '@ant-design/icons';
import './setting-form.scss';

export const SettingForm = ({
    initialData,
}: {
    initialData: Store,
}) => {

    const [loading, setLoading] = useState<boolean>(false);

    const info = () => {
        Modal.info({
            title: 'This is a notification message',
            content: (
                <div>
                    <p>some messages...some messages...</p>
                    <p>some messages...some messages...</p>
                </div>
            ),
            onOk: () => {
                console.log(123);
            },
        });
    };

    const onFinish = (values: any) => {
        console.log(values);
    };

    return (
        <Spin spinning={loading}>
            <div className="setting-form-wrapper">
                <div className="page-header-wrapper">
                    <Heading title='Setting' description='Manage store preferences' />
                    <Button onClick={info} size="large" danger type="primary"><DeleteOutlined /></Button>
                </div>
                <Divider />

                <Col span={4}>
                    <Form
                        requiredMark='optional'
                        layout="vertical"
                        name="basic"
                        id="create-store-form"
                        onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >

                        <Form.Item
                            label={<b>Store name</b>}
                            name="name"
                            rules={[{ required: true, message: 'Please input your store name!' }]}
                            tooltip={{ title: 'Required field', icon: <InfoCircleOutlined /> }}
                        >
                            <Input placeholder="Store name" size="large" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Save change
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </div>
        </Spin>
    );
}