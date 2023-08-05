'use client';

import { Button, Modal } from "antd";
import React, { useImperativeHandle, useState } from "react";

type CreateStoreModal = {
    title?: string,
    description: string,
};

export const CreateStoreModal = React.forwardRef(({
    title,
    desciption,
}: {
    title?: string,
    desciption?: string,
}, ref) => {
    const [visible, setVisible] = useState<boolean>(false);

    const handleSubmit = () => {
        setVisible(false);
    };

    const handleClose = () => {
        setVisible(false);
    };

    useImperativeHandle(ref, () => ({
        open: () => setVisible(true),
    }));

    return (
        <>
            <Modal
                title={title}
                centered
                open={visible}
                onOk={handleSubmit}
                onCancel={handleClose}
            >
                <p>some contents...</p>
                <p>some contents...</p>
                <p>some contents...</p>
            </Modal>
        </>
    );
});