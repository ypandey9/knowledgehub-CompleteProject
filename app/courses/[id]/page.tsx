// // app/courses/[id]/page.tsx
// import React from "react";
// import CourseDetailsClient from "./CourseDetailsClient";
// import { COURSES } from "../data";
// import { getLessonProgress } from "@/app/actions/getLessonProgress";

// // dummy lessons (replace later with DB)
// const LESSONS = [
//   { id: "1", courseId: "1", title: "Introduction", duration: "5 min" },
//   { id: "2", courseId: "1", title: "Setup & Tools", duration: "12 min" },
//   { id: "3", courseId: "1", title: "Main Concepts", duration: "18 min" },
//   { id: "4", courseId: "1", title: "Final Project", duration: "10 min" },
// ];


// export default async function CourseDetailsPage({
//   params,
// }: {
//   params: Promise<{id: string }>;
// }) {
//   const { id }  = await params; 

// const course=COURSES.find((c)=>c.id===id) ?? null;
// const lessons=LESSONS.filter((l)=>l.courseId===id);

// const completedLessons=await getLessonProgress(id);

// if(!course) return <p className="p-10 text-center">Course not found</p>;

//   return (
//     <div className="max-w-3xl mx-auto mt-10 bg-white p-6 shadow rounded">
//       <CourseDetailsClient 
//       course={course} 
//       courseId={id} 
//       lessons={lessons}
//       completedLessons={completedLessons}
//       />
//     </div>
//   );
// }

// app/courses/[id]/page.tsx
import { prisma } from "@/utils/prisma";
import CourseDetailsClient from "./CourseDetailsClient";
import { getLessonProgress } from "@/app/actions/getLessonProgress";

export default async function CourseDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: courseId } = await params;

  const course = await prisma.course.findUnique({
    where: { id: courseId },
  });

  if (!course) {
    return <p className="p-10 text-center">Course not found</p>;
  }

  const lessons = await prisma.lesson.findMany({
    where: { courseId },
    orderBy: { order: "asc" },
  });

  const completedLessons = await getLessonProgress(courseId);

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 shadow rounded">
      <CourseDetailsClient
        course={course}
        courseId={courseId}
        lessons={lessons}
        completedLessons={completedLessons}
      />
    </div>
  );
}
