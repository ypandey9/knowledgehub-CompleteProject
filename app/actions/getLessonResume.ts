"use server";

import { prisma } from "@/utils/prisma";
import { cookies } from "next/headers";

export async function getLessonResume(
    courseId:string,
    lessonId:string
) :Promise<number> {
    const cookiesStore=await cookies();
    const auth=cookiesStore.get("auth_user");
    if(!auth) return 0;

    const user=JSON.parse(auth.value);

    const progress=await prisma.lessonProgress.findUnique({
        where: {
            userId_courseId_lessonId : {
                userId:user.id,
                courseId,
                lessonId,
            },
        },
    });

    return progress?.lastPosition ?? 0;
}