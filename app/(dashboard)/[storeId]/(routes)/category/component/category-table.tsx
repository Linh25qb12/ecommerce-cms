'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Button, Input, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Billboard, Category } from '@prisma/client';
import { format } from 'date-fns';
import { EditOutlined, DeleteOutlined, CopyOutlined } from '@ant-design/icons';
import { EditCategoryModal } from './edit-category-modal';
import './component.scss';

const TableHeader = ({ title, onSearch }: { title: string, onSearch: (txt: string) => void }) => {
    const { Search } = Input;

    const handleSearch = (value: string) => {
        onSearch(value)
    }

    return (
        <div className='table-header'>
            <h2>{title}</h2>
            <Search allowClear placeholder="input search text" onSearch={handleSearch} style={{ width: 200, height: 32 }} />
        </div>
    );
};

export const CategoryTable = ({
    data,
    billboardList
}: {
    data: Category[],
    billboardList: Billboard[]
}) => {
    const [dataSource, setDataSource] = useState<Category[]>(data);
    const [refesh, setRefesh] = useState(0);
    const [defaultValue, setDefaultValue] = useState<Category>();
    const editCategoryModalRef = useRef<any>(null);

    const columns: ColumnsType<Category> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
        },
        {
            title: 'Billboard',
            dataIndex: ['billboard', 'label'],
            key: 'billboardLabel',
            width: '30%',
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
                        <CopyOutlined style={{color: '#4f91ff'}} />
                        <EditOutlined onClick={() => editCategoryModalRef?.current.open()} style={{color: 'green'}} />
                        <DeleteOutlined style={{color: 'red'}} />
                    </div>
                );
            }
        }

    ];


    useEffect(() => {
        setDataSource(data);
    }, [data])

    const onSearch = (value: string) => {
        setDataSource(data.filter((Category: Category) => Category.name.includes(value)));
    };

    const formatTotal = dataSource.length > 0 ? dataSource.length : 1;

    return (
        <div className='custom-table-wrapper'>
            <TableHeader onSearch={(txt) => onSearch(txt)} title='Category' />
            <Table onRow={(record, rowIndex) => {
                return {
                    onClick: (e) => {
                        setDefaultValue(record);
                    }
                }
            }} key={refesh} pagination={{ pageSize: 6, total: formatTotal }} columns={columns} dataSource={dataSource} />
            <EditCategoryModal ref={editCategoryModalRef} billboardList={billboardList} initialData={defaultValue} />
        </div>
    )
};
