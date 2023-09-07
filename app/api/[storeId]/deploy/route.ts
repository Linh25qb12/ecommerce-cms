import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from "next/server";

export  async function POST(
    request: NextApiRequest,
    response: NextApiResponse<{}>
) {

    const publicClerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
    const secretClerkKey = process.env.CLERK_SECRET_KEY;
    const database = process.env.DATABASE_URL;
    const stripeApiKey = process.env.STRIPE_API_KEY;
    const stripeWebhookKey = process.env.STRIPE_WEBHOOK_SECRET;
    const vercelBearerKey = process.env.BEARER_KEY;

    const result = await fetch("https://api.vercel.com/v9/projects", {
        body: JSON.stringify({
            name: "test-deploy-3",
            framework: "nextjs",
            publicSource: true,
            environmentVariables: [
                {
                    key: "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
                    target: "production",
                    type: "encrypted",
                    value: publicClerkKey,
                },
                {
                    key: "CLERK_SECRET_KEY",
                    target: "production",
                    type: "encrypted",
                    value: secretClerkKey,
                },
                {
                    key: "NEXT_PUBLIC_CLERK_SIGN_IN_URL",
                    target: "production",
                    type: "encrypted",
                    value: '/sign-in'
                },
                {
                    key: "NEXT_PUBLIC_CLERK_SIGN_UP_URL",
                    target: "production",
                    type: "encrypted",
                    value: '/sign-up'
                },
                {
                    key: "NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL",
                    target: "production",
                    type: "encrypted",
                    value: '/'
                },
                {
                    key: "NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL",
                    target: "production",
                    type: "encrypted",
                    value: '/'
                },
                {
                    key: "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME",
                    target: "production",
                    type: "encrypted",
                    value: 'greenwich-university'
                },
                {
                    key: "DATABASE_URL",
                    target: "production",
                    type: "encrypted",
                    value: database,
                },
                {
                    key: "STRIPE_API_KEY",
                    target: "production",
                    type: "encrypted",
                    value: stripeApiKey
                },
                {
                    key: "FRONTEND_STORE_URL",
                    target: "production",
                    type: "encrypted",
                    value: 'http://localhost:3001'
                },
                {
                    key: "STRIPE_WEBHOOK_SECRET",
                    target: "production",
                    type: "encrypted",
                    value: stripeWebhookKey
                },
                {
                    key: "BEARER_KEY",
                    target: "production",
                    type: "encrypted",
                    value: vercelBearerKey
                }
            ],
            gitRepository: {
                repo: "Linh25qb12/ecommerce-cms",
                type: "github"
            },
            skipGitConnectDuringLink: true,
        }),
        headers: {
            "Authorization": `Bearer ${vercelBearerKey}`
        },
        method: "post"
    });

    const data = await result.json();
    return NextResponse.json(data);
}