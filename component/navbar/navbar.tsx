'use client';

import { UserButton } from '@clerk/nextjs';
import { Button, Divider, Layout, Menu, Select } from 'antd';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { ShoppingOutlined, PlusOutlined } from '@ant-design/icons';
import { useStoreModal } from '@/hook/useStoreModal';
import './navbar.scss';
import { Store } from '@prisma/client';


export const Navbar = ({
    storeList,
    className,
    ...props
}: React.HTMLAttributes<HTMLElement> & {storeList: Store[]}) => {
    const { Header } = Layout;
    const params = useParams();
    const router = useRouter();
    const pathname = usePathname();
    const storeModal = useStoreModal();

    const itemList = [
        
        {
            label: <Link href={`/${params.storeId}`}><b>Overview</b></Link>,
            key: 'dashboard',
        },  
        {
            label: <Link href={`/${params.storeId}/billboard`}><b>Billboard</b></Link>,
            key: 'billboard',
        },
        {
            label: <Link href={`/${params.storeId}/category`}><b>Category</b></Link>,
            key: 'category',
        },    
        {
            label: <Link href={`/${params.storeId}/setting`}><b>Setting</b></Link>,
            key: 'setting',
        },
    ]

    return (
        <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20}}>
            <Select
                showSearch
                style={{ width: 170 }}
                suffixIcon={<ShoppingOutlined style={{fontSize: 20, fontWeight: 'bold', color: 'black'}} />}
                placeholder="Select a store"
                optionFilterProp="children"
                defaultValue={params.storeId}
                onChange={(value) => router.push(`/${value}`)} 
                dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider style={{ margin: '4px 0' }} />
                        <Button onClick={() => storeModal.onOpen()} style={{width: '100%'}} type="link" size='small' icon={<PlusOutlined />} >
                          Create Store
                        </Button>
                    </>
                  )}
                options={storeList.map(((store: Store) => {
                    return {
                        value: store.id,
                        label:  <b>{store.name}</b>,
                    }
                }))}
            />
            <Menu 
                theme='dark'
                selectedKeys={pathname.split('/')[2] ? [pathname.split('/')[2] as string] : ['dashboard']}
                style={{ flex: 'auto', gap: 5 }}
                mode="horizontal"
                items={itemList}
            />
            <UserButton afterSignOutUrl='/' />
        </Header>
    );
};