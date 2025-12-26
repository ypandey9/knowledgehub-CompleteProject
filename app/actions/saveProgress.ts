"use server";

import getAuthUser from "@/utils/auth";
import { prisma } from "@/utils/prisma";

export async function markLessonComplete(
    courseId:string,
    lessonId:string
) {
    const user=await getAuthUser();
    if(!user) throw new Error("Unauthorised");

    await prisma.lessonProgress.upsert({
        where:{
            userId_courseId_lessonId: {
                userId:user.id,
                courseId,
                lessonId,
            },
        },

        update: {
            completed:true,
        },
    create : {
        userId:user.id,
        courseId,
        lessonId,
        completed:true,
    },
    });
}