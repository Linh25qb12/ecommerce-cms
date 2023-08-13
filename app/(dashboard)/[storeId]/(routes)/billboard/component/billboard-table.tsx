'use client';

import React, { useRef, useState } from 'react';
import { Input, Table } from 'antd';
import type {  ColumnsType } from 'antd/es/table';
import { Billboard } from '@prisma/client';
import { format } from 'date-fns';
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

export const BillboardTable = ({ data }: { data: Billboard[] }) => {
    const [dataSource, setDataSource] = useState<Billboard[]>(data);


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
            render: () => {
                return <>Haha</>
            }
        }

    ];

    const formatTotal = dataSource.length > 0 ? dataSource.length : 1;

    const onSearch = (value: string) => {
        setDataSource(data.filter((billboard: Billboard) => billboard.label.includes(value)));
    };

    return (
        <div className='custom-table-wrapper'>
            <TableHeader onSearch={(txt) => onSearch(txt)} title='Billboard'/>
            <Table pagination={{ pageSize: 6, total: formatTotal }} columns={columns} dataSource={dataSource} />
        </div>
    )
};
