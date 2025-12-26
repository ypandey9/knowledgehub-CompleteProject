"use server";
import { prisma } from "@/utils/prisma";
import { cookies } from "next/headers";

export async function completeCourse(courseId:string){
    const cookieStore=await cookies();
    const auth=cookieStore.get("auth_user");
    if(!auth) return;

    const user=JSON.parse(auth.value);

    await prisma.courseCompletion.upsert({
        where: {
            userId_courseId : {
                userId:user.id,
                courseId,
            },
        },

        update :{},
        create : {
            userId:user.id,
            courseId,
            certificateId:crypto.randomUUID(),
        },
    });
}