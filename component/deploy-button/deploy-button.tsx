'use client'

import { Button } from "antd";
import { Octokit } from "octokit";
import axios from "axios";
import { createKoreFile, createGitHubAdaptor } from "korefile";

export const DeployButton = ({ storeId }: { storeId: string }) => {

    const deployProduction = async () => {
        try {
            const octokit = new Octokit({
                auth: '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'
            });

            const githubRepo = await octokit.request('POST /repos/gotecq-linhdoan/ecommerce-store/generate', {
                name: 'test-deploy-vercel-final',
                description: 'Cloning store font-end',
                include_all_branches: false,
                'private': false,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            });

            const project = await axios.post(`/api/${storeId}/project`, { projectName: githubRepo.data.name });

            
            const koreFile = createKoreFile({
                adaptor: createGitHubAdaptor({
                    owner: "Linh25qb12",
                    repo: githubRepo.data.name,
                    ref: "heads/main",
                    token: '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'
                })
            });

            const testFilePath = "Test";
            await koreFile.writeFile(testFilePath, 'This is text file to force vercel deploy the production');

            // await fetch("https://api.vercel.com/v9/projects/ecommerce-cms/domains", {
            //     "headers": {
            //         "Authorization": "Bearer B4ykZGPXFG4xbUD2dAkw7L3Y"
            //     },
            //     "method": "get"
            // })

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Button type="default" onClick={deployProduction}>Deploy production</Button>
    )
};