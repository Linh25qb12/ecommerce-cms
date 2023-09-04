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
                            value: "pk_test_ZGVlcC1idWxsZG9nLTk0LmNsZXJrLmFjY291bnRzLmRldiQ"
                        },
                        {
                            key: "CLERK_SECRET_KEY",
                            target: "production",
                            type: "encrypted",
                            value: "sk_test_Fe84KIx7cuQIj1DAvr0YGnAhQ6WfjXjk7WW3nSi6Vp"
                        },
                        {
                            key: "NEXT_PUBLIC_CLERK_SIGN_IN_URL",
                            target: "production",
                            type: "encrypted",
                            value: "/sign-in"
                        },
                        {
                            key: "NEXT_PUBLIC_CLERK_SIGN_UP_URL",
                            target: "production",
                            type: "encrypted",
                            value: "/sign-up"
                        },
                        {
                            key: "NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL",
                            target: "production",
                            type: "encrypted",
                            value: "/"
                        },
                        {
                            key: "NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL",
                            target: "production",
                            type: "encrypted",
                            value: "/"
                        },
                        {
                            key: "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME",
                            target: "production",
                            type: "encrypted",
                            value: "greenwich-university"
                        },
                        {
                            key: "DATABASE_URL",
                            target: "production",
                            type: "encrypted",
                            value: "mysql://wjram64zq1m69hg6h11z:pscale_pw_kzMJBWTdhXtiuTNQZKgliBDJyczWGyJ6OtLJ8CnHgSU@aws.connect.psdb.cloud/ecommerce-admin?sslaccept=strict"
                        },
                        {
                            key: "STRIPE_API_KEY",
                            target: "production",
                            type: "encrypted",
                            value: "sk_test_51Nl79iGCDWPN2bUUosHQ0tFfELvEfoCl2tDik27OvZQd8kgX0NPryrGcb6YWt4bPVjbSexvIELnBHuAGNYok3XmT00HaHZEsvM"
                        },
                        {
                            key: "FRONTEND_STORE_URL",
                            target: "production",
                            type: "encrypted",
                            value: "http://localhost:3001"
                        },
                        {
                            key: "STRIPE_WEBHOOK_SECRET",
                            target: "production",
                            type: "encrypted",
                            value: "whsec_d8e43e430972bdc57e9eaf781897bbacd5d22877de00dc83f64909be5ac048a3"
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