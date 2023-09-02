'use client';

import { Button, Image } from "antd";
import { CldUploadWidget } from "next-cloudinary"
import { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined, FileImageOutlined, PlusOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import './image-upload.scss';

export const ImageUploader = ({
    onChange,
    value='',
}: {
    onChange: (value: string) => void,
    value: string,
    disabled?: boolean,
}) => {
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const onUpload = (result: any) => {
        onChange(result.info.secure_url);
    }

    const onRemoveImage = () => {
        onChange('');
    }
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <div>
            {value && value.length > 0 &&
                <div>
                    <Image src={value} sizes="200" alt="" />
                </div>
            }
            <CldUploadWidget onUpload={onUpload} uploadPreset="vci4cfvs">
                {({ open }) => {
                    const onClick = () => {
                        open();
                    }
                    return (
                        <>
                            {value.length === 0
                                ? <Button style={{ width: '100%', height: 200 }} type="dashed" size="large" onClick={onClick}>
                                    <FileImageOutlined style={{ fontSize: 25}} />&nbsp;
                                    <b>Click to upload</b>
                                </Button>
                                : <><Button onClick={onClick} type="text" size="large" ><EditOutlined /></Button>
                                    <Button onClick={onRemoveImage} type="text" size="large" danger ><DeleteOutlined /></Button></>
                            }
                        </>
                    );
                }}
            </CldUploadWidget>
        </div>
    )
}

export const MultiImageUploader = ({
    onChange,
    onRemove,
    value=[],
}: {
    onChange: (value: string) => void,
    onRemove: (imageUrl: string) => void,
    value: string[],
    disabled?: boolean,
}) => {
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const onUpload = (result: any) => {
        onChange(result.info.secure_url);
    }

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <div>
            {value && value.length > 0 &&
            <div className="multi-image-list">
                {value.map((imageUrl) => {
                    return (
                        <div className="multi-image-wrapper" key={uuidv4()}>
                            <Image src={imageUrl} height="100" alt="" />
                            <Button className="delete-btn" style={{position: 'absolute', left: 10, top: 10}} onClick={() => onRemove(imageUrl)} type="dashed" size="small" danger ><DeleteOutlined /></Button>
                        </div>
                    )
                })}
            </div>
            }
            <CldUploadWidget onUpload={onUpload} uploadPreset="vci4cfvs">
                {({ open }) => {
                    const onClick = () => {
                        open();
                    }
                    return (
                        <>
                            {value.length === 0
                                ? <Button style={{ width: '100%', height: 200 }} type="dashed" size="large" onClick={onClick}>
                                    <FileImageOutlined style={{ fontSize: 25}} />&nbsp;
                                    <b>Click to upload</b>
                                </Button>
                                : <Button onClick={onClick} type="text" size="large" ><PlusOutlined /></Button>
                            }
                        </>
                    );
                }}
            </CldUploadWidget>
        </div>
    )
} 
