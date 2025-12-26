"use server";

import { prisma } from "@/utils/prisma";
import { cookies } from "next/headers";
import { generateCertificatePDF } from "@/app/lib/pdf";


export async function generateCertificate({
  courseId,
  courseTitle,
}: {
  courseId: string;
  courseTitle: string;
}) {
    const cookiesStore=await cookies();
    const auth=cookiesStore.get("auth_user");
    if(!auth) throw new Error("Unauthorized");

    const user=JSON.parse(auth.value);

    const record=await prisma.courseCompletion.findUnique({
        where:{
            userId_courseId : {
                userId:user.id,
                courseId,
            },
        },
    });

    if(!record) throw new Error("Course not completed");

    return await generateCertificatePDF({
        userName : user.name,
        courseTitle,
        certificateId : record.certificateId,
    });
}