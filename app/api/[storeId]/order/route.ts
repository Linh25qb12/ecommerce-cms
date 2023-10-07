import prismadb from "@/lib/prismadb";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const userId = req.headers.get("X-USER-ID");

    if (!userId) {
        return new NextResponse("You are not logged in, please provide token to gain access", { status: 401 });
    }

    const user = await prismadb.user.findUnique({ where: { id: userId } });

    return NextResponse.json({
        status: "success",
        data: { user: { ...user, password: undefined } },
    });
}
