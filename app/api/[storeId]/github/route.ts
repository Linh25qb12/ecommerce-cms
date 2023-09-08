import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from "next/server";
import { Octokit } from 'octokit';

export async function POST(
    request: NextApiRequest,
    response: NextApiResponse<{}>,
    { params }: { params: { storeId: string } }
) {

    const octokit = new Octokit({
        auth: 'Bearer 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'
    });

    const result = await octokit.request('POST /repos/gotecq-linhdoan/ecommerce-store/generate', {
        name: 'Test-clone',
        description: 'This is your first repository',
        include_all_branches: false,
        'private': false,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })

    return NextResponse.json(result);
};