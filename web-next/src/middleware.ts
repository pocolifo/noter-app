import { NextRequest, NextResponse } from "next/server";
import { API, authenticate } from "./app/lib/api";

export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/_next/static') || request.nextUrl.pathname.startsWith('/login')) {
        return;
    }

    const response = await fetch(`${API}/`, {
        headers: request.headers  // includes Cookie header
    });

    const responseJson = await response.json();

    if (responseJson.user === null) {
        // Not authenticated
        const url = request.nextUrl.clone();
        url.pathname = '/login';
        return NextResponse.redirect(url, { status: 302 });
    }
}