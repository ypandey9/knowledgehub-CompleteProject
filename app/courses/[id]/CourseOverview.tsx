"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CourseOverview({
  courseId,
  lessons,
}: {
  courseId: string;
  lessons: any[];
}) {
  const [lastLesson, setLastLesson] = useState<{
    lessonId: string;
    title: string;
  } | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("lastWatched");
      if (!saved) return; // ✅ nothing saved yet

      const parsed = JSON.parse(saved);

      // ✅ validate data shape
      if (
        !parsed ||
        typeof parsed !== "object" ||
        parsed.courseId !== courseId ||
        !parsed.lessonId ||
        !parsed.title
      ) {
        return;
      }

      // ✅ safe state update
      setLastLesson({
        lessonId: parsed.lessonId,
        title: parsed.title,
      });
    } catch (err) {
      console.warn("Invalid lastWatched data. Clearing it.", err);
      localStorage.removeItem("lastWatched");
    }
  }, [courseId]);

  return (
    <div className="mt-6 p-4 bg-gray-50 border rounded">
      <h3 className="text-lg font-semibold mb-2">Continue Learning</h3>

      {lastLesson ? (
        <>
          <p className="text-gray-700 mt-1">{lastLesson.title}</p>

          <Link
            href={`/courses/${courseId}/lesson/${lastLesson.lessonId}`}
            className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mt-2"
          >
            Resume Lesson →
          </Link>
        </>
      ) : (
        <Link
          href={`/courses/${courseId}/lesson/${lessons[0]?.id}`}
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Start Learning →
        </Link>
      )}
    </div>
  );
}
