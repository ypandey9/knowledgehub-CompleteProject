"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import TabsProvider from "@/components/Tabs/TabsProvider";
import Tabs from "@/components/Tabs/Tabs";
import TabPanel from "@/components/Tabs/TabPanel";
import Curriculum from "./Curriculum";
import CourseOverview from "./CourseOverview";
import CourseProgressBar from "./CourseProgressBar";
import ReviewList from "./ReviewList";
import LessonList from "./LessonsList";
import { setCompletedLessons } from "@/store/progressSlice";

export default function CourseDetailsClient({
  course,
  courseId,
  lessons,
  completedLessons,
}: {
  course: any;
  courseId: string;
  lessons: any[];
  completedLessons: string[];
}) {
  const dispatch = useDispatch();

  // ✅ HYDRATE REDUX FROM DB
  useEffect(() => {
    dispatch(
      setCompletedLessons({
        courseId,
        lessonIds: completedLessons,
      })
    );
  }, [dispatch, courseId, completedLessons]);

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 shadow rounded">
      {/* <h1 className="text-3xl font-bold">Course: {course.title}</h1> */}

      <TabsProvider defaultTab="overview">
        <Tabs />

        {/* OVERVIEW */}
        <TabPanel whenActive="overview">
          <CourseOverview courseId={courseId} lessons={lessons} />
          <CourseProgressBar
            courseId={courseId}
            totalLessons={lessons.length}
          />
        </TabPanel>

        {/* CURRICULUM */}
        <TabPanel whenActive="curriculum">
          <Curriculum curriculum={course.curriculum ?? []} />
        </TabPanel>

        {/* LESSONS */}
        <TabPanel whenActive="lessons">
          <LessonList courseId={courseId} lessons={lessons} />
        </TabPanel>

        {/* REVIEWS */}
        <TabPanel whenActive="reviews">
          <ReviewList courseId={courseId} />
        </TabPanel>
      </TabsProvider>
    </div>
  );
}
