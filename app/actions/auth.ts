"use server";

import { cookies } from "next/headers";

export async function setAuthCookies(user:any) {
   
    const cookieStore=await cookies();
    cookieStore.set({
     name:"auth_user",
     value:JSON.stringify(user),
     httpOnly:true,
     secure:false,
     path:"/",
    });
 return true;
}