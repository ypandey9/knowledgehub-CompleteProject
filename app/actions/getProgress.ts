"use server";

import getAuthUser from "@/utils/auth";
import { prisma} from "@/utils/prisma"

export async function getCourseProgress(courseId:string) {
    const user=await getAuthUser();
    if(!user) return [];
    return prisma.lessonProgress.findMany({
        where: {
            userId:user.id,
            courseId,
            completed:true,
        },
    });
}