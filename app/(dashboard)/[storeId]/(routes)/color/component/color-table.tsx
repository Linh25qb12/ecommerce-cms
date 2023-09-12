'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ColorPicker, Input, Modal, Spin, Table, notification } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Color, Size } from '@prisma/client';
import { format } from 'date-fns';
import { EditOutlined, DeleteOutlined, CopyOutlined } from '@ant-design/icons';
import { EditColorModal } from './edit-color-modal';
import './component.scss';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';

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

export const ColorTable = ({
    data,
}: {
    data: Color[],
}) => {
    const [dataSource, setDataSource] = useState<Color[]>(data);
    const [selectValue, setSelectValue] = useState<Color>();
    const editColorModalRef = useRef<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const params = useParams();

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        notification.success({
            message: 'Color ID copied to the clipboard',
            placement: "bottomRight",
            duration: 2
        })
    }

    const columns: ColumnsType<Color> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
        },
        {
            title: 'Hex value',
            dataIndex: 'value',
            key: 'value',
            width: '30%',
            render: (text) => {
                return <ColorPicker value={text} open={false} showText />
            }
        },
        {
            title: 'Create Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
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
                        <CopyOutlined onClick={() => onCopy(record.id)} style={{ color: '#4f91ff' }} />
                        <EditOutlined onClick={() => editColorModalRef?.current.open()} style={{ color: 'green' }} />
                        <DeleteOutlined onClick={() => {
                            Modal.confirm({
                                title: 'Delete color?',
                                content: (
                                    <p>Are you sure you want to delete this color?<br /> This action cannot be undone. </p>
                                ),
                                onOk: async () => {
                                    try {
                                        setLoading(true)
                                        await axios.delete(`/api/${params.storeId}/color/${record.id}`);
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

    useEffect(() => {
        setDataSource(data);
    }, [data]);

    const onSearch = (value: string) => {
        setDataSource(data.filter((Color: Color) => Color.name.includes(value)));
    };

    const formatTotal = dataSource.length > 0 ? dataSource.length : 1;

    return (
        <Spin spinning={loading}>
            <div className='custom-table-wrapper'>
                <TableHeader onSearch={(txt) => onSearch(txt)} title='Size' />
                <Table onRow={(record, rowIndex) => {
                    return {
                        onClick: (e) => {
                            setSelectValue(record);
                        }
                    }
                }} pagination={{ pageSize: 6, total: formatTotal }} columns={columns} dataSource={dataSource} />
                <EditColorModal ref={editColorModalRef} initialData={selectValue as any} />
            </div>
        </Spin>
    )
};
