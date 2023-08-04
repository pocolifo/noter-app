import { NextRequest, NextResponse } from 'next/server';

// Also in next.config.js
const API = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

export async function middleware(request: NextRequest) {
	if (
		request.nextUrl.pathname.startsWith('/_next/static') ||
		request.nextUrl.pathname.startsWith('/api') ||
		request.nextUrl.pathname.startsWith('/login')
	) {
		return;
	}

	const response = await fetch(API, {
		headers: request.headers, // includes Cookie header
	})

	const responseJson = await response.json();

	if (responseJson.user === null) {
		// Not authenticated
		const url = request.nextUrl.clone();
		url.pathname = '/login';
		return NextResponse.redirect(url, { status: 302 });
	}
}
