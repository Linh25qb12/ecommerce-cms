'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Input, Modal, Table, notification, Spin } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Billboard } from '@prisma/client';
import { format } from 'date-fns';
import { EditOutlined, DeleteOutlined, CopyOutlined } from '@ant-design/icons';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { EditBillboardModal } from './edit-billboard-modal';
import './component.scss';

const TableHeader = ({ title, onSearch }: { title: string, onSearch: (txt: string) => void }) => {
    const { Search } = Input;

    const handleSearch = (value: string) => {
        onSearch(value)
    }

    return (
        <div className='table-header'>
            <h2 style={{ lineHeight: '32px' }}>{title}</h2>
            <Search allowClear placeholder="input search text" onSearch={handleSearch} style={{ width: 200, height: 32 }} />
        </div>
    );
};

export const BillboardTable = ({ data }: { data: Billboard[] }) => {
    const [dataSource, setDataSource] = useState<Billboard[]>(data);
    const editBillboardModalRef = useRef<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const params = useParams();
    
    const columns: ColumnsType<Billboard> = [
        {
            title: 'Label',
            dataIndex: 'label',
            key: 'label',
            width: '30%',
        },
        {
            title: 'Create Date',
            dataIndex: 'createAt',
            key: 'createAt',
            width: '30%',
            render: (text) => {
                return (
                    <>{format(text, 'PPP')}</>
                );
            }
        },
        {
            title: 'Action',
            key: 'action',
            width: '10%',
            render: (_, record, index) => {
                return (
                    <div className='action-button'>
                        <CopyOutlined style={{ color: '#4f91ff' }} />
                        <EditOutlined onClick={() => {
                            editBillboardModalRef?.current.open(record)
                        }} style={{ color: 'green' }} />
                        <DeleteOutlined onClick={() => {
                            Modal.confirm({
                                title: 'Delete size?',
                                content: (
                                    <p>Are you sure you want to delete this billboard?<br /> This action cannot be undone. </p>
                                ),
                                onOk: async () => {
                                    try {
                                        setLoading(true)
                                        await axios.delete(`/api/${params.storeId}/billboard/${record.id}`);
                                        notification.success({
                                            message: 'Delete category success!',
                                            placement: "bottomRight",
                                            duration: 2
                                        })
                                        router.refresh();
                                    } catch (error) {
                                        notification.error({
                                            message: 'Somthing went wrong!',
                                            description: 'Make sure you removed all categories using this billboard first.',
                                            placement: "bottomRight",
                                            duration: 2
                                        })
                                    } finally {
                                        setLoading(false);
                                    }
                                },
                            })
                        }} style={{ color: 'red' }} />
                    </div>
                );
            }
        }

    ];

    const formatTotal = dataSource.length > 0 ? dataSource.length : 1;

    const onSearch = (value: string) => {
        setDataSource(data.filter((billboard: Billboard) => billboard.label.includes(value)));
    };

    useEffect(() => {
        setDataSource(data);
    }, [data]);

    return (
        <div>
            <Spin spinning={loading}>
                <div className='custom-table-wrapper'>
                    <TableHeader onSearch={(txt) => onSearch(txt)} title={`${data.length} Billboard`} />
                    <Table pagination={{ pageSize: 6, total: formatTotal }} columns={columns} dataSource={dataSource} />
                    <EditBillboardModal ref={editBillboardModalRef} />
                </div>
            </Spin>
        </div>
    )
};
