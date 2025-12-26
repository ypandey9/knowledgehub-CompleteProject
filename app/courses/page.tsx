import CourseSkelton from "@/components/CourseSkeleton";
import { CourseCard } from "@/components/CoursesList";
import { Suspense } from "react";

export const revalidate=60;

async function getCourses() {
    const res=await fetch("http://localhost:3000/api/courses",{
        next:{ revalidate :60},
    });

    return res.json();
}

export default async function CourseList(){
return(
<Suspense fallback={<CourseSkelton />}>
<CoursePage />
</Suspense>
);
}

 async function CoursePage() {
    const courses=await getCourses();

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h1 className="text-3xl font-bold mb-6">Available Courses</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((c:any)=>(
                <CourseCard key={c.id} course={c} />
            ))}
            </div>
        </div>
    );
}