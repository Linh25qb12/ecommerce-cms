'use client';

import React, { useImperativeHandle, useState } from "react";
import { Button, Col, ColorPicker, Divider, Form, Input, Modal, notification, Row, Select, Spin } from "antd";
import { InfoCircleOutlined, InfoCircleFilled, BgColorsOutlined } from '@ant-design/icons';
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
        const formatData = () => {
            const header_main = typeof values.header_main === 'string' ? values.header_main : values.header_main.toHexString();
            const header_contrast = typeof values.header_contrast === 'string' ? values.header_contrast : values.header_contrast.toHexString();
            const header_secondary = typeof values.header_secondary === 'string' ? values.header_secondary : values.header_secondary.toHexString();
            const container_main = typeof values.container_main === 'string' ? values.container_main : values.container_main.toHexString();
            const container_contrast = typeof values.container_contrast === 'string' ? values.container_contrast : values.container_contrast.toHexString();
            const container_secondary = typeof values.container_secondary === 'string' ? values.container_secondary : values.container_secondary.toHexString();

            return {
                header_main: header_main,
                header_contrast: header_contrast,
                header_secondary: header_secondary,
                container_main: container_main,
                container_contrast: container_contrast,
                container_secondary: container_secondary,
            };
        }
        setLoading(true);
        deployProject(formatData());
        setTimeout(() => { setLoading(false); setVisible(false) }, 120000);
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
                    <div className="create-note">
                        <InfoCircleFilled style={{ color: 'rgb(77, 143, 205)', paddingTop: 5, fontSize: 16 }} />
                        <p style={{ textAlign: 'justify', fontSize: 14 }}>
                            The theme of the header and footer should be different from the theme of the content for better display effects.
                            The colors within an element can also be contrasting to create efficiency in displaying information.
                        </p>
                    </div>
                    <Form
                        key={refesh}
                        requiredMark='optional'
                        layout="vertical"
                        name="basic"
                        id="custom-store-form"
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <h3><BgColorsOutlined /> Header and Footer Theme</h3>
                        <Divider style={{ margin: '10px 0' }} />
                        <Row gutter={8}>
                            <Col span={12}>
                                <Form.Item
                                    label={<b>Background Color</b>}
                                    name="header_main"
                                    rules={[{ required: true, message: 'Please input your size name!' }]}
                                    initialValue={'#000000'}
                                    tooltip={{ title: 'Color of Header/Footer background', icon: <InfoCircleOutlined /> }}
                                >
                                    <ColorPicker format="hex" showText />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label={<b>Text Color</b>}
                                    name="header_contrast"
                                    rules={[{ required: true, message: 'Please input your size name!' }]}
                                    initialValue={'#ffffff'}
                                    tooltip={{ title: 'Color of the text display in Header/Footer', icon: <InfoCircleOutlined /> }}
                                >
                                    <ColorPicker format="hex" showText />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={8}>
                            <Col span={12}>
                                <Form.Item
                                    label={<b>Neutral Color</b>}
                                    name="header_secondary"
                                    rules={[{ required: true, message: 'Please input your size name!' }]}
                                    initialValue={'#808080'}
                                    tooltip={{ title: 'Color of text or background of child component display on Header/Footer', icon: <InfoCircleOutlined /> }}
                                >
                                    <ColorPicker format="hex" showText />
                                </Form.Item>
                            </Col>
                        </Row>
                        <h3><BgColorsOutlined /> Content Theme</h3>
                        <Divider style={{ margin: '10px 0' }} />
                        <Row gutter={8}>
                            <Col span={12}>
                                <Form.Item
                                    label={<b>Background Color</b>}
                                    name="container_main"
                                    rules={[{ required: true, message: 'Please input your size name!' }]}
                                    initialValue={'#ffffff'}
                                    tooltip={{ title: 'Color of Content background', icon: <InfoCircleOutlined /> }}
                                >
                                    <ColorPicker format="hex" showText />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label={<b>Text Color</b>}
                                    name="container_contrast"
                                    rules={[{ required: true, message: 'Please input your size name!' }]}
                                    initialValue={'#000000'}
                                    tooltip={{ title: 'Color of the text display in Header/Footer', icon: <InfoCircleOutlined /> }}
                                >
                                    <ColorPicker format="hex" showText />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={8}>
                            <Col span={12}>
                                <Form.Item
                                    label={<b>Neutral Color</b>}
                                    name="container_secondary"
                                    rules={[{ required: true, message: 'Please input your size name!' }]}
                                    initialValue={'#acabab'}
                                    tooltip={{ title: 'Color of text or background of child component display on Content', icon: <InfoCircleOutlined /> }}
                                >
                                    <ColorPicker format="hex" showText />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                            </Col>
                        </Row>
                    </Form>
                    <div className="create-note">
                        <InfoCircleFilled style={{ color: 'rgb(77, 143, 205)', paddingTop: 5, fontSize: 16 }} />
                        <p style={{ textAlign: 'justify', fontSize: 14 }}>
                            You can leave these field above by its default value and we will genarate website by default theme.
                            You can check website default themea <a>here</a>.
                        </p>
                    </div>
                </Spin>
            </Modal>
        </>
    );
});