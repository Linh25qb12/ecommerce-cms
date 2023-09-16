'use client';

import React, { useImperativeHandle, useState } from "react";
import { Button, Col, Divider, Form, Input, Modal, notification, Row, Select, Spin } from "antd";
import { InfoCircleOutlined, InfoCircleFilled } from '@ant-design/icons';
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

export const CustomStoreModal = React.forwardRef(({
    deployProject,
}: {
    deployProject: (value: any) => void,
}, ref) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [refesh, setRefresh] = useState(0);

    useImperativeHandle(ref, () => {
        return {
            open: () => {
                setVisible(true);
            }
        };
    }, []);

    const onFinish = async (values: any) => {
        setLoading(true);
        deployProject(values);
        setTimeout(() => { setLoading(false); setVisible(false) }, 5000);
    };


    const onCancle = () => {
        setVisible(false);
    };

    return (
        <>
            <Modal
                title='Custom your own store theme'
                className="footless-modal"
                centered
                open={visible}
                onCancel={onCancle}
                footer={[
                    <Button key="back" disabled={loading} onClick={onCancle}>
                        Return
                    </Button>,
                    <Button form="custom-store-form" loading={loading} key="submit" type="primary" htmlType="submit">
                        Create
                    </Button>,
                ]}
            >
                <Spin spinning={loading} tip='Creating website...' >
                    <Form
                        key={refesh}
                        requiredMark='optional'
                        layout="vertical"
                        name="basic"
                        id="custom-store-form"
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <h3>Header and Footer Theme</h3>
                        <Divider style={{ margin: '10px 0' }} />
                        <Row gutter={8}>
                            <Col span={12}>
                                <Form.Item
                                    label={<b>Background Color</b>}
                                    name="header_main"
                                    rules={[{ required: true, message: 'Please input your size name!' }]}
                                    tooltip={{ title: 'Required field', icon: <InfoCircleOutlined /> }}
                                >
                                    <Input placeholder="Size name" size="large" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label={<b>Text Color</b>}
                                    name="header_main"
                                    rules={[{ required: true, message: 'Please input your size name!' }]}
                                    tooltip={{ title: 'Required field', icon: <InfoCircleOutlined /> }}
                                >
                                    <Input placeholder="Size name" size="large" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={8}>
                            <Col span={12}>
                                <Form.Item
                                    label={<b>Neutral Color</b>}
                                    name="header_main"
                                    rules={[{ required: true, message: 'Please input your size name!' }]}
                                    tooltip={{ title: 'Required field', icon: <InfoCircleOutlined /> }}
                                >
                                    <Input placeholder="Size name" size="large" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <h3>Content Theme</h3>
                        <Divider style={{ margin: '10px 0' }} />
                        <Row gutter={8}>
                            <Col span={12}>
                                <Form.Item
                                    label={<b>Background Color</b>}
                                    name="header_main"
                                    rules={[{ required: true, message: 'Please input your size name!' }]}
                                    tooltip={{ title: 'Required field', icon: <InfoCircleOutlined /> }}
                                >
                                    <Input placeholder="Size name" size="large" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label={<b>Text Color</b>}
                                    name="header_main"
                                    rules={[{ required: true, message: 'Please input your size name!' }]}
                                    tooltip={{ title: 'Required field', icon: <InfoCircleOutlined /> }}
                                >
                                    <Input placeholder="Size name" size="large" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={8}>
                            <Col span={12}>
                                <Form.Item
                                    label={<b>Neutral Color</b>}
                                    name="header_main"
                                    rules={[{ required: true, message: 'Please input your size name!' }]}
                                    tooltip={{ title: 'Required field', icon: <InfoCircleOutlined /> }}
                                >
                                    <Input placeholder="Size name" size="large" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                            </Col>
                        </Row>
                    </Form>
                    <div className="create-note">
                        <InfoCircleFilled style={{ color: 'rgb(77, 143, 205)'}} /><p style={{ textAlign: 'justify', fontSize: 13 }}>The theme of the header and footer should be different from the theme of the content for better display effects. The colors within an element can also be contrasting to create efficiency in displaying information.</p>
                    </div>
                </Spin>
            </Modal>
        </>
    );
});