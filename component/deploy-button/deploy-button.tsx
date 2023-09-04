'use client'

import { Button } from "antd";
import axios from "axios";

export const DeployButton = () => {

    const deployProduction = async () => {
        try {
            const result = await fetch("https://api.vercel.com/v9/projects", {
                body: JSON.stringify({
                    name: "test-deploy-1",
                    framework: "nextjs",
                    publicSource: true,
                    environmentVariables: [
                        {
                            key: "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
                            target: "production",
                            type: "encrypted",
                            value: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
                        },
                        {
                            key: "CLERK_SECRET_KEY",
                            target: "production",
                            type: "encrypted",
                            value: process.env.CLERK_SECRET_KEY
                        },
                        {
                            key: "NEXT_PUBLIC_CLERK_SIGN_IN_URL",
                            target: "production",
                            type: "encrypted",
                            value: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL
                        },
                        {
                            key: "NEXT_PUBLIC_CLERK_SIGN_UP_URL",
                            target: "production",
                            type: "encrypted",
                            value: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL
                        },
                        {
                            key: "NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL",
                            target: "production",
                            type: "encrypted",
                            value: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL
                        },
                        {
                            key: "NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL",
                            target: "production",
                            type: "encrypted",
                            value: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL
                        },
                        {
                            key: "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME",
                            target: "production",
                            type: "encrypted",
                            value: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
                        },
                        {
                            key: "DATABASE_URL",
                            target: "production",
                            type: "encrypted",
                            value: process.env.DATABASE_URL
                        },
                        {
                            key: "STRIPE_API_KEY",
                            target: "production",
                            type: "encrypted",
                            value: process.env.STRIPE_API_KEY
                        },
                        {
                            key: "FRONTEND_STORE_URL",
                            target: "production",
                            type: "encrypted",
                            value: process.env.FRONTEND_STORE_URL
                        },
                        {
                            key: "STRIPE_WEBHOOK_SECRET",
                            target: "production",
                            type: "encrypted",
                            value: process.env.STRIPE_WEBHOOK_SECRET
                        }
                    ],
                    gitRepository: {
                        repo: "Linh25qb12/ecommerce-cms",
                        type: "github"
                    }
                }),
                headers: {
                    "Authorization": "Bearer B4ykZGPXFG4xbUD2dAkw7L3Y"
                },
                method: "post"
            });
            const data = await result.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Button type="default" onClick={deployProduction}>Deploy production</Button>
    )
};