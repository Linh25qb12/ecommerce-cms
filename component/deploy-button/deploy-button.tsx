'use client'

import { Button } from "antd";
import { Octokit } from "octokit";
import axios from "axios";

export const DeployButton = ({ storeId }: { storeId: string }) => {

    // const publicClerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
    // const secretClerkKey = process.env.NEXT_PUBLIC_CLERK_SECRET_KEY;
    // const database = process.env.DATABASE_URL;
    // const stripeApiKey = process.env.STRIPE_API_KEY;
    // const stripeWebhookKey = process.env.STRIPE_WEBHOOK_SECRET;
    // const vercelBearerKey = process.env.VERCEL_BEARER_KEY;

    // console.log(publicClerkKey);
    // console.log(secretClerkKey);

    const deployProduction = async () => {
        try {
            // const result = await fetch("https://api.vercel.com/v9/projects", {
            //     body: JSON.stringify({
            //         name: "test-deploy",
            //         framework: "nextjs",
            //         publicSource: true,
            //         environmentVariables: [
            //             {
            //                 key: "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
            //                 target: "production",
            //                 type: "encrypted",
            //                 value: publicClerkKey,
            //             },
            //             {
            //                 key: "CLERK_SECRET_KEY",
            //                 target: "production",
            //                 type: "encrypted",
            //                 value: secretClerkKey,
            //             },
            //             {
            //                 key: "NEXT_PUBLIC_CLERK_SIGN_IN_URL",
            //                 target: "production",
            //                 type: "encrypted",
            //                 value: '/sign-in'
            //             },
            //             {
            //                 key: "NEXT_PUBLIC_CLERK_SIGN_UP_URL",
            //                 target: "production",
            //                 type: "encrypted",
            //                 value: '/sign-up'
            //             },
            //             {
            //                 key: "NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL",
            //                 target: "production",
            //                 type: "encrypted",
            //                 value: '/'
            //             },
            //             {
            //                 key: "NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL",
            //                 target: "production",
            //                 type: "encrypted",
            //                 value: '/'
            //             },
            //             {
            //                 key: "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME",
            //                 target: "production",
            //                 type: "encrypted",
            //                 value: 'greenwich-university'
            //             },
            //             {
            //                 key: "DATABASE_URL",
            //                 target: "production",
            //                 type: "encrypted",
            //                 value: database,
            //             },
            //             {
            //                 key: "STRIPE_API_KEY",
            //                 target: "production",
            //                 type: "encrypted",
            //                 value: stripeApiKey
            //             },
            //             {
            //                 key: "FRONTEND_STORE_URL",
            //                 target: "production",
            //                 type: "encrypted",
            //                 value: 'http://localhost:3001'
            //             },
            //             {
            //                 key: "STRIPE_WEBHOOK_SECRET",
            //                 target: "production",
            //                 type: "encrypted",
            //                 value: stripeWebhookKey
            //             },
            //             {
            //                 key: "VERCEL_BEARER_KEY",
            //                 target: "production",
            //                 type: "encrypted",
            //                 value: vercelBearerKey
            //             }
            //         ],
            //         gitRepository: {
            //             repo: "Linh25qb12/ecommerce-cms",
            //             type: "github"
            //         },
            //         skipGitConnectDuringLink: true,
            //     }),
            //     headers: {
            //         "Authorization": `Bearer ${vercelBearerKey}`
            //     },
            //     method: "post"
            // });
            // const data = await result.json();
            // console.log(data);
            // const res = await axios.post(`/api/${storeId}/deploy`);
            // const res = await fetch("https://api.vercel.com/v9/projects/ecommerce-cms/domains", {
            //     "headers": {
            //         "Authorization": "Bearer B4ykZGPXFG4xbUD2dAkw7L3Y"
            //     },
            //     "method": "get"
            // })
            const octokit = new Octokit({
                auth: 'Bearer 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'
            })

            // const res = await octokit.request('GET /repos/gotecq-linhdoan/ecommerce-store', {
            //     owner: 'Linh25qb12',
            //     repo: 'ecommerce-store',
            //     headers: {   
            //       'X-GitHub-Api-Version': '2022-11-28'
            //     }
            //   })

            // const res = await octokit.request('POST /repos/gotecq-linhdoan/ecommerce-store/forks', {
            //     name: 'fucntioning',
            //     // owner: 'Linh25qb12',
            //     // repo: 'ecommerce-store',
            //     // organization: 'octocat',
            //     // default_branch_only: true,
            //     headers: {
            //         'X-GitHub-Api-Version': '2022-11-28'
            //     }
            // })

            const res = await octokit.request('POST /repos/gotecq-linhdoan/ecommerce-store/generate', {
                // template_owner: 'gotecq-linhdoan',
                // template_repo: 'ecommerce-store',
                // owner: 'gotecq-linhdoan',
                name: 'Test-clone',
                description: 'This is your first repository',
                include_all_branches: false,
                'private': false,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            })
            // await axios.post('https://api.vercel.com/v12/now/deployments', {
            //     name: 'MyDeployment',
            //     projectId: res.data.id,
            //     target: 'production',
            // },
            //     {
            //         headers: {
            //             "Authorization": 'Bearer B4ykZGPXFG4xbUD2dAkw7L3Y'
            //         },
            //     });
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Button type="default" onClick={deployProduction}>Deploy production</Button>
    )
};