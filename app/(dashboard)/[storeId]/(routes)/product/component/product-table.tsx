'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Input, Modal, Table, notification, Spin, ColorPicker, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Category, Color, Product, Size } from '@prisma/client';
import { format } from 'date-fns';
import { EditOutlined, DeleteOutlined, CopyOutlined } from '@ant-design/icons';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { EditProductModal } from './edit-product-modal';
import './component.scss';

const TableHeader = ({ title, onSearch }: { title: string, onSearch: (txt: string) => void }) => {
    const { Search } = Input;

    const handleSearch = (value: string) => {
        onSearch(value)
    }

    return (
        <div className='table-header'>
            <h2 style={{ lineHeight: '32px' }}>{title}</h2>
            <Search allowClear placeholder="Input search text" onSearch={handleSearch} style={{ width: 200, height: 32 }} />
        </div>
    );
};

export const ProductTable = ({
    data,
    categoryList,
    sizeList,
    colorList

}: {
    data: Product[],
    categoryList: Category[],
    sizeList: Size[],
    colorList: Color[],
}) => {
    const [dataSource, setDataSource] = useState<Product[]>(data);
    const editProductModalRef = useRef<any>(null);
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

    const columns: ColumnsType<Product> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '14%',
        },
        {
            title: 'Category',
            dataIndex: ['category', 'name'],
            key: 'category',
            width: '14%',
        },
        {
            title: 'Create Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: '12%',
            render: (text) => {
                return (
                    <>{format(text, 'PPP')}</>
                );
            }
        },
        {
            title: 'Archived',
            dataIndex: 'isArchived',
            key: 'isArchived',
            width: '10%',
            render: (text) => {
                if (text === true) {
                    return <Tag color="blue">TRUE</Tag>
                }
                return <Tag color="red">FALSE</Tag>
            }
        },
        {
            title: 'Featured',
            dataIndex: 'isFeatured',
            key: 'isFeatured',
            width: '10%',
            render: (text) => {
                if (text === true) {
                    return <Tag color="blue">TRUE</Tag>
                }
                return <Tag color="red">FALSE</Tag>
            }
        },
        {
            title: 'Size',
            dataIndex: ['size', 'name'],
            key: 'size',
            width: '10%',
        },
        {
            title: 'Color',
            dataIndex: ['color', 'value'],
            key: 'color',
            render: (text) => {
                return <ColorPicker value={text} open={false} showText />
            },
            width: '10%',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            width: '10%',
            render: (text) => {
                return <>{text}$</>
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
                        <EditOutlined onClick={() => {
                            editProductModalRef?.current.open(record)
                        }} style={{ color: 'green' }} />
                        <DeleteOutlined onClick={() => {
                            Modal.confirm({
                                title: 'Delete size?',
                                content: (
                                    <p>Are you sure you want to delete this product?<br /> This action cannot be undone. </p>
                                ),
                                onOk: async () => {
                                    try {
                                        setLoading(true)
                                        await axios.delete(`/api/${params.storeId}/product/${record.id}`);
                                        notification.success({
                                            message: 'Delete product success!',
                                            placement: "bottomRight",
                                            duration: 2
                                        })
                                        router.refresh();
                                    } catch (error) {
                                        notification.error({
                                            message: 'Somthing went wrong!',
                                            description: 'Make sure you removed all categories using this product first.',
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
        setDataSource(data.filter((product: Product) => product.name.includes(value)));
    };

    useEffect(() => {
        setDataSource(data);
    }, [data]);

    return (
        <Spin spinning={loading}>
            <div className='custom-table-wrapper'>
                <TableHeader onSearch={(txt) => onSearch(txt)} title={`${data.length} Product`} />
                <Table pagination={{ pageSize: 6, total: formatTotal }} columns={columns} dataSource={dataSource} />
                <EditProductModal
                    categoryList={categoryList}
                    sizeList={sizeList}
                    colorList={colorList}
                    ref={editProductModalRef}
                />
            </div>
        </Spin>
    )
};
