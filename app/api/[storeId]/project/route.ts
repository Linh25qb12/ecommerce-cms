import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params }: { params: { storeId: string } }
) {

    const body = await req.json();
    const { projectName } = body;

    const result = await fetch("https://api.vercel.com/v9/projects", {
        body: JSON.stringify({
            name: projectName,
            framework: "nextjs",
            publicSource: true,
            environmentVariables: [
                {
                    key: "NEXT_PUBLIC_API_URL",
                    target: "production",
                    type: "encrypted",
                    value: `https://ecommerce-cms-ochre.vercel.app/api/${params.storeId}`,
                },
                {
                    key: "JWT_SECRET_KEY",
                    target: "production",
                    type: "encrypted",
                    value: 'my_ultra_secure_jwt_secret_key',
                },
                {
                    key: "JWT_EXPIRES_IN",
                    target: "production",
                    type: "encrypted",
                    value: '60',
                },
            ],
            gitRepository: {
                repo: `Linh25qb12/${projectName}`,
                type: "github"
            },
            skipGitConnectDuringLink: true,
        }),
        headers: {
            "Authorization": `Bearer ${process.env.BEARER_KEY}`
        },
        method: "post"
    });

    const data = await result.json();
    return NextResponse.json(data);
};
