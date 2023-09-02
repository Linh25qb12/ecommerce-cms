import { Alert, Tag, notification, Button } from "antd";
import { CopyOutlined, CloudDownloadOutlined } from '@ant-design/icons';

export const APIAlert = ({
    title,
    description,
    apiStatus,
}: {
    title: string,
    description: string,
    apiStatus: string
}) => {

    const apiStatusMap = (apiType: string) => {
        if(apiType === 'admin') {
            return 'Admin';
        };
        return 'Public';
    }

    const apiColorMap = (apiType: string) => {
        if(apiType === 'admin') {
            return '#000000';
        };
        return '#bebebe';
    };

    const onCopy = () => {
        navigator.clipboard.writeText(description);
        notification.success({
            message: 'API Route copied to the clipboard',
            placement: "bottomRight",
            duration: 2
        })
    }
    return (
        <Alert
            style={{ background: 'white', border: '1px solid #d3d3d3', marginTop: 20 }}
            message={<><b>{title}&nbsp;&nbsp;<Tag color={apiColorMap(apiStatus)} style={{ borderRadius: 999999, padding: '1px 10px' }}>{apiStatusMap(apiStatus)}</Tag></b></>}
            description={<b><Tag style={{ color: 'black', fontSize: 14 }} color='#d3d3d3'>{description}</Tag></b>}
            type="info"
            action={
                <Button onClick={onCopy} size='large' type="text">
                    <CopyOutlined />
                </Button>
            }
            showIcon
            icon={<CloudDownloadOutlined />}
        />
    );
};