import { NextResponse } from "next/server";
import { createKoreFile, createGitHubAdaptor } from "korefile";

export async function POST(
    req: Request,
    { params }: { params: { storeId: string } }
) {

    const body = await req.json();
    const { repoName } = body;

    const koreFile = createKoreFile({
        adaptor: createGitHubAdaptor({
            owner: "Linh25qb12",
            repo: repoName,
            ref: "heads/main",
            token: process.env.GITHUB_BEARER_KEY
        })
    });

    const testFilePath = "Test";
    await koreFile.writeFile(testFilePath, 'This is text file to force vercel deploy the production');

    return NextResponse.json('Commit success', {status: 200});
};