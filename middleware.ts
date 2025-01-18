import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
    const token = request.cookies.get('token');
    const { pathname } = request.nextUrl;

    // اگر کاربر لاگین کرده باشد و در حال دسترسی به صفحه لاگین باشد، او را به داشبورد هدایت کن
    if (token && pathname === '/login') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // اگر کاربر لاگین نکرده باشد و در حال دسترسی به صفحه داشبورد یا صفحه خرید دوره باشد، او را به صفحه لاگین با پارامتر redirectTo هدایت کن
    if (!token && (pathname.startsWith('/dashboard') || pathname === '/dashboard/plans')) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.append('redirectTo', '/dashboard/plans');  // اضافه کردن پارامتر redirectTo
        return NextResponse.redirect(loginUrl);
    }

    // اجازه دسترسی به سایر صفحات
    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/login', '/dashboard/plans'],
};
