"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function LessonsList({
  courseId,
  lessons,
}: {
  courseId: string;
  lessons: any[];
}) {
  const completedLessons =
    useSelector(
      (state: RootState) => state.progress.completed[courseId]
    ) || [];

  const lastWatched =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("lastWatched") || "null")
      : null;

  return (
    <div className="mt-4 space-y-2">
      {lessons.map((lesson) => {
        const isCompleted = completedLessons.includes(lesson.id);
        const isCurrent =
          lastWatched?.courseId === courseId &&
          lastWatched?.lessonId === lesson.id;

        return (
          <div
            key={lesson.id}
            className="flex items-center gap-3 p-3 border rounded bg-white"
          >
            {/* STATUS ICON */}
            <span className="text-lg w-5 text-center">
              {isCompleted ? "✓" : isCurrent ? "▶" : "•"}
            </span>

            {/* TITLE */}
            <div className="flex-1">
              <p className="font-medium">{lesson.title}</p>
              <p className="text-sm text-gray-500">{lesson.duration}</p>
            </div>

            {/* LINK */}
            <Link
              href={`/courses/${courseId}/lesson/${lesson.id}`}
              className="text-blue-600 hover:underline text-sm"
            >
              Watch →
            </Link>
          </div>
        );
      })}
    </div>
  );
}
