import { cookies } from "next/headers";

export default async function getAuthUser(){
    const cookieStore=await cookies();
    const auth=cookieStore.get("auth_user");

    if(!auth) return null;

    try {

        return JSON.parse(auth.value);
    } catch {
        return null;
    }
}