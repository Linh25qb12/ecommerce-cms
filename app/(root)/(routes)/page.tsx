'use client';

import { Button, ConfigProvider } from 'antd';
import { theme } from '@/lib/theme/themeConfig';
import { useEffect, useRef, useState } from 'react';
import { useStoreModal } from '@/hook/useStoreModal';

const SetupPage = () => {
    const onOpen = useStoreModal((state) => state.onOpen);
    const isOpen = useStoreModal((state) => state.isOpen);

    useEffect(() => {
        if (!isOpen) {
            onOpen();
        }
    }, [onOpen, isOpen]);

    return null;
};

export default SetupPage;
