import { prisma } from "@/utils/prisma";
import { cookies } from "next/headers";
import { DownloadButton } from "./DownloadButton";
import { COURSES } from "@/app/courses/data";

export default async function CertificatePage({
    params,
} : { 
    params:Promise<{courseId:string}>;
}) {
    const { courseId }=await params;
    const cookieStore=await cookies();
    const auth=cookieStore.get("auth_user");
    if(!auth) return <p>Unauthorized</p>;

    const user=JSON.parse(auth.value);

    const record=await prisma.courseCompletion.findUnique({
        where: {
            userId_courseId : {
                userId:user.id,
                courseId,
            },
        },
    });

    if(!record) {
        return <p>Course not completed yet</p>
    }

    const course=COURSES.find((c)=>c.id===courseId);

    return (
        <div className="max-w-3xl mx-auto mt-10 p-10 bg-white border shadow text-center">
            <h1 className="text-4xl font-bold">Certificate of completion</h1>
            <p className="mt-6 text-lg">
                This certifies that 
            </p>
            <p className="text-2xl font-semibold mt-2">{user.name}</p>
            <p className="mt-4">
                has sucessfully completed the course
            </p>
            
            {/* <p className="text-xl font-bold mt-2">{record.courseTitle}</p> */}

            <p className="text-xl font-bold mt-2">
                {course?.title ?? courseId} 
            </p>

            <p className="mt-6 text-sm text-gray-500">
                Certificate ID : {record.certificateId}
            </p>
            <DownloadButton courseId={courseId} />
        </div>
    );
}