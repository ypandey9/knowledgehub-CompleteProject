"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { markCompleted } from "@/store/progressSlice";
import { saveLessonProgress } from "@/app/actions/saveLessonProgress";
import { getLessonResume } from "@/app/actions/getLessonResume";

export default function LessonPlayer({
  courseId,
  lessonId,
  videoUrl,
  title,
}: {
  courseId: string;
  lessonId: string;
  videoUrl: string;
  title: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const dispatch = useDispatch();

  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [completedSent,setCompletedSent]=useState(false);
  const [hydrated,setHydrated]=useState(false);

  // ▶ Resume playback
  //useEffect(() => {
  //   const saved = localStorage.getItem(
  //     `video-progress-${courseId}-${lessonId}`
  //   );
  //   if (saved && videoRef.current) {
  //     videoRef.current.currentTime = Number(saved);
  //   }
  // }, [courseId, lessonId]);

  useEffect(()=>{
    async function resume(){
      const lastPosition=await getLessonResume(courseId,lessonId);
      if(videoRef.current && lastPosition>0){
        videoRef.current.currentTime=lastPosition;
      }
      setHydrated(true);
    }
    resume();
  },[courseId,lessonId]);

  // ▶ Track progress
  async function handleTimeUpdate() {
    if (!videoRef.current) return;

    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration || 1;

    const percent = (current / duration) * 100;
    setProgress(percent);

    // save local resume
    // localStorage.setItem(
    //   `video-progress-${courseId}-${lessonId}`,
    //   String(current)
    // );

    // ✅ Auto-complete at 90%
    if (percent >= 90 && !completedSent) {

      setCompletedSent(true);
      dispatch(markCompleted({ courseId, lessonId }));

      await saveLessonProgress({
        courseId,
        lessonId,
        completed: true,
        lastPosition: current,
      });
    }
  }

  // ▶ Save progress when paused/unload
  async function persistProgress() {
    if (!videoRef.current) return;

    await saveLessonProgress({
      courseId,
      lessonId,
      completed: completedSent,
      lastPosition: videoRef.current.currentTime,
    });
  }

  useEffect(()=>{
    return()=>{
      persistProgress();
    };
  },[]);

  if(!hydrated) {
    return <p className="text-sm text-gray-500">Loading lesson...</p>;
  }

  return (
    <div className="mt-6 bg-white p-4 rounded shadow border">
      <h2 className="text-xl font-semibold mb-3">{title}</h2>

      <video
        ref={videoRef}
        src={videoUrl}
        controls
        className="w-full rounded"
        onTimeUpdate={handleTimeUpdate}
        onPause={persistProgress}
      />

      {/* ▶ Progress bar */}
      <div className="mt-2 h-2 w-full bg-gray-200 rounded">
        <div
          className="h-2 bg-blue-600 rounded"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      {/* ▶ Controls */}
      <div className="flex justify-between items-center mt-3">
        <span className="text-sm text-gray-600">
          Watched {Math.floor(progress)}%
        </span>

        <select
          value={speed}
          onChange={(e) => {
            const s = Number(e.target.value);
            setSpeed(s);
            if (videoRef.current) {
              videoRef.current.playbackRate = s;
            }
          }}
          className="border rounded px-2 py-1 text-sm"
        >
          {[0.5, 1, 1.25, 1.5, 2].map((s) => (
            <option key={s} value={s}>
              {s}x
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
