"use client";

import Link from "next/link";

export default function DashboardClient({
  courses,
  progress,
}: {
  courses: any[];
  progress: any[];
}) {
  function courseProgress(courseId: string) {
    return progress.filter((p) => p.courseId === courseId).length;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>

      {courses.length === 0 && (
        <p className="text-gray-600">You are not enrolled in any courses.</p>
      )}

      <div className="space-y-4">
        {courses.map((course) => {
          const completed = courseProgress(course.id);
          const total = course.lessons?.length || 4;
          const percent = Math.round((completed / total) * 100);

          return (
            <div
              key={course.id}
              className="bg-white p-4 rounded shadow border"
            >
              <h2 className="text-xl font-semibold">{course.title}</h2>

              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded h-2 mt-3">
                <div
                  className="bg-green-600 h-2 rounded"
                  style={{ width: `${percent}%` }}
                />
              </div>

              <p className="text-sm mt-1 text-gray-600">
                {percent}% completed
              </p>

              <Link
                href={`/courses/${course.id}`}
                className="inline-block mt-3 text-blue-600 hover:underline"
              >
                Go to course →
              </Link>

            <Link 
              href={`/certificate/${course.id}`}
              className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded"
            >View Certificate 🎉</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
