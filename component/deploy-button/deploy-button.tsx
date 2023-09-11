'use client'

import { Connect } from "@prisma/client";
import { Button } from "antd";
import axios from "axios";

export const DeployButton = ({ storeId, storeName, connectId }: { storeId: string, storeName: string, connectId: string }) => {

    const deployProduction = async () => {
        try {
            await axios.patch(`/api/store/${storeId}`, {
                name: storeName,
                connectId: connectId
            });
            const githubRepo = await axios.post(`/api/${storeId}/github/repo`, { repoName: storeName });
            await axios.post(`/api/${storeId}/project`, { projectName: githubRepo.data.data.name.toLowerCase() });
            await axios.post(`/api/${storeId}/github/commit`, { repoName: githubRepo.data.data.name });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Button size="large" type="primary" onClick={deployProduction}>Deploy production</Button>
    )
};