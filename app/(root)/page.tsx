'use client';

import { Button, ConfigProvider } from 'antd';
import { theme } from '@/lib/theme/themeConfig';
import { UserButton } from '@clerk/nextjs';
import { useRef } from 'react';
import { CreateStoreModal } from '@/component/modal/createStoreModal';

const SetupPage = () => {

  const createStoreModal = useRef<any>(null);

  return (
    <ConfigProvider theme={theme}>
      <div className="setup-page-wrapper">
        <UserButton afterSignOutUrl='/' />
        <Button onClick={(e) => {
          createStoreModal.current?.open();
        }}>Add store</Button>
        <CreateStoreModal
          title='Create Store'
          ref={createStoreModal}
        />
      </div>
    </ConfigProvider>
  );
};

export default SetupPage;
