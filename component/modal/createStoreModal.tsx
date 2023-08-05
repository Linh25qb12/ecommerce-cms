'use client';

import { useStoreModal } from "@/hook/useStoreModal";
import { Button, Checkbox, Form, Input, Modal } from "antd";
import React, { useImperativeHandle, useState } from "react";

export type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

export const CreateStoreModal = () => {
    const storeModal = useStoreModal();

    const [confirmModalLoading, setConfirmModalLoading] = useState<boolean>(true);

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    return (
        <>
            <Modal
                title='Create your own Store'
                centered
                open={storeModal.isOpen}
                onOk={storeModal.onOk}
                onCancel={storeModal.onCancle}
                footer={[
                    <Button key="back" onClick={storeModal.onCancle}>
                        Return
                    </Button>,
                    <Button form="create-store-form" loading={confirmModalLoading} key="submit" type="primary" htmlType="submit">
                        Submit
                    </Button>,
                ]}
            >
                <Form
                    name="basic"
                    id="create-store-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item<FieldType>
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{ offset: 8, span: 16 }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};