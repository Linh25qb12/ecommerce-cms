'use client'

import { Button } from "antd";
import axios from "axios";

export const DeployButton = ({ storeId }: { storeId: string }) => {

    const deployProduction = async () => {
        try {
            const githubRepo = await axios.post(`/api/${storeId}/github/repo`, { repoName: 'New Repo API 2' });
            await axios.post(`/api/${storeId}/project`, { projectName: githubRepo.data.data.name.toLowerCase() });
            await axios.post(`/api/${storeId}/github/commit`, { repoName: githubRepo.data.data.name });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Button type="default" onClick={deployProduction}>Deploy production</Button>
    )
};