import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params }: { params: { storeId: string } }
) {

    const body = await req.json();
    const { projectName } = body;
    console.log(projectName);
    const vercelBearerKey = process.env.BEARER_KEY;

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
            ],
            gitRepository: {
                repo: `Linh25qb12/${projectName}`,
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
};
