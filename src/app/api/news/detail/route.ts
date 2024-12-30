import { NextRequest, NextResponse } from "next/server";
import { fetchMetaText } from "@/utils/fetch-meta";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const link = searchParams.get("link");

    if (!link) {
        return NextResponse.json({ status: 200, data: null });
    }

    try {
        const response = await fetch(link);
        const htmlData = await response.text();
        const content = await fetchMetaText(htmlData);
        return NextResponse.json({ status: 200, data: content });
    } catch (error) {
        return NextResponse.json({ status: 200, data: null });
    }
}
