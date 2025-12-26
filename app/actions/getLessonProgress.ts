"use server";
import { prisma } from "@/utils/prisma";
import { cookies } from "next/headers";

export async function getLessonProgress(courseId:string) {

    const cookieStore=await cookies();
    const auth=cookieStore.get("auth_user");
    if(!auth) return [];

    const user=JSON.parse(auth.value);
    const progress=await prisma.lessonProgress.findMany({
        where : {
            userId:user.id,
            courseId,
            completed:true,
        },

        select : {
            lessonId:true,
        },
    });

    return progress.map((p)=>p.lessonId);
}