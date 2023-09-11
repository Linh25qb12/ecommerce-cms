import { NextResponse } from "next/server";
import { Octokit } from 'octokit';

export async function POST(
    req: Request,
    { params }: { params: { storeId: string } }
) {

    const body = await req.json();
    const { repoName } = body;
    const octokit = new Octokit({
        auth: process.env.GITHUB_BEARER_KEY
    });

    const result = await octokit.request('POST /repos/gotecq-linhdoan/ecommerce-store/generate', {
        name: repoName,
        description: `${repoName} Production`,
        include_all_branches: false,
        'private': false,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })

    return NextResponse.json(result);
};