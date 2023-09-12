'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Input, Spin, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Order } from '@prisma/client';
import { format } from 'date-fns';
import { useParams, useRouter } from 'next/navigation';
import './component.scss';

const TableHeader = ({ title, onSearch }: { title: string, onSearch: (txt: string) => void }) => {
    const { Search } = Input;

    const handleSearch = (value: string) => {
        onSearch(value)
    }

    return (
        <div className='table-header'>
            <h2>{title}</h2>
            <Search allowClear placeholder="Input search text" onSearch={handleSearch} style={{ width: 200, height: 32 }} />
        </div>
    );
};

export const OrderTable = ({
    data,
}: {
    data: Order[],
}) => {
    const [dataSource, setDataSource] = useState<Order[]>(data);

    const editOrderModalRef = useRef<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const params = useParams();

    const columns: ColumnsType<Order> = [
        {
            title: 'Product',
            dataIndex: 'orderItems',
            key: 'productList',
            render: (text) => {
                return (
                    <>{text.map((orderItem: any) => orderItem.product.name).join(', ')}</>
                );
            }
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Total Price',
            dataIndex: 'orderItems',
            key: 'totalPrice',
            render: (text) => {
                return (
                    <>{text.reduce((total: any, item: any) => {
                        return total + Number(item.product.price)
                    }, 0)}</>
                );
            }
        },
        {
            title: 'Paid Status',
            dataIndex: 'isPaid',
            key: 'isPaid',
            render: (text) => {
                if (text === true) {
                    return <Tag color="blue">TRUE</Tag>
                }
                return <Tag color="red">FALSE</Tag>
            }
        },
        {
            title: 'Order Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text) => {
                return (
                    <>{format(text, 'PPP')}</>
                );
            }
        },
    ];

    useEffect(() => {
        setDataSource(data);
    }, [data])

    const onSearch = (value: string) => {
        setDataSource(data.filter((Order: Order) => Order.address.includes(value)));
    };

    const formatTotal = dataSource.length > 0 ? dataSource.length : 1;

    return (
        <Spin spinning={loading}>
            <div className='custom-table-wrapper'>
                <TableHeader onSearch={(txt) => onSearch(txt)} title='Order' />
                <Table pagination={{ pageSize: 6, total: formatTotal }} columns={columns} dataSource={dataSource} />
            </div>
        </Spin>
    )
};
