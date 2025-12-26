import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request:NextRequest) {

    const authCookies=request.cookies.get("auth_user");

    const protectedRoutes=[
        "/dashboard",
        "/courses",
        "/my-courses",
    ];

    const isProtected=protectedRoutes.some((path)=>
    request.nextUrl.pathname.startsWith(path)
    );

    if(isProtected  && !authCookies){
        const loginUrl=new URL("/login",request.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}