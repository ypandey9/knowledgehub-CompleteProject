// "use client";

// import { useParams, useRouter } from "next/navigation";
// import LessonPlayer from "../../LessonPlayer";
// import { LESSONS } from "../data";

// export default function LessonPlayerPage() {
//   const params = useParams();
//   const router = useRouter();

//   const courseId = params.id as string;
//   const lessonId = params.lessonId as string;

//   const lessonList = LESSONS.filter(
//     (l) => l.courseId === courseId
//   );

//   const index = lessonList.findIndex(
//     (l) => l.id === lessonId
//   );

//   const lesson = lessonList[index];

//   if (!lesson) {
//     return <p className="p-6">Lesson not found</p>;
//   }

//   const prevLesson = lessonList[index - 1];
//   const nextLesson = lessonList[index + 1];

//   return (
//     <div className="max-w-4xl mx-auto mt-10 bg-white p-6 shadow rounded">
//       <LessonPlayer
//         courseId={courseId}
//         lessonId={lesson.id}
//         title={lesson.title}
//         videoUrl={lesson.videoUrl}
//       />

//       {/* Navigation */}
//       <div className="flex justify-between mt-6">
//         {prevLesson ? (
//           <button
//             onClick={() =>
//               router.push(
//                 `/courses/${courseId}/lesson/${prevLesson.id}`
//               )
//             }
//             className="bg-gray-300 px-4 py-2 rounded"
//           >
//             ← Previous
//           </button>
//         ) : (
//           <div />
//         )}

//         {nextLesson ? (
//           <button
//             onClick={() =>
//               router.push(
//                 `/courses/${courseId}/lesson/${nextLesson.id}`
//               )
//             }
//             className="bg-blue-600 text-white px-4 py-2 rounded"
//           >
//             Next →
//           </button>
//         ) : (
//           <div />
//         )}
//       </div>
//     </div>
//   );
// }

import { prisma } from "@/utils/prisma";
import LessonPlayer from "../../LessonPlayer";

export default async function LessonPlayerPage({
  params,
}: {
  params: Promise<{ id: string; lessonId: string }>;
}) {
  const { id: courseId, lessonId } = await params;

  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
  });

  if (!lesson) {
    return <p className="p-6">Lesson not found</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-6 shadow rounded">
      <LessonPlayer
        courseId={courseId}
        lessonId={lesson.id}
        title={lesson.title}
        videoUrl={lesson.videoUrl!}
      />
    </div>
  );
}
