import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { projectId: string } }
) {
    try {

        if (!params.projectId) {
            return new NextResponse('Project ID is required!', { status: 400 });
        }

        const result = await fetch(`https://api.vercel.com/v9/projects/${params.projectId}/domains`, {
            headers: {
              "Authorization": `Bearer ${process.env.BEARER_KEY}`
            },
            method: "get"
          })

        const data = await result.json();

        return NextResponse.json(data);


    } catch (error) {
        console.log('[PRODUCT_GET]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}