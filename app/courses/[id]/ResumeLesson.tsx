"use client";
import { useEffect,useState } from "react";

export default function ResumeLesson({ courseId } : {courseId:string}) {
    const [lastLesson,setLastLesson]=useState<{
        courseId:string;
        lessonId:string;
        title:string;
    } | null>(null);


useEffect(()=>{
    const saved=localStorage.getItem("lastWatched");
    if(!saved) return;

    try {

        const parsed=JSON.parse(saved);
        if(parsed.courseId===courseId) {
            setLastLesson(parsed);
        } 
        }catch(e) {
            console.error("Invalid lastwatched data",e);
    }
},[courseId]);

if(!lastLesson) return null;

return (
    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded">
        <h3 className="text-lg font-semibold text-blue-700">Continue learning</h3>
        <p className="text-gray-700 mt-1">{lastLesson.title}</p>
        <a
        href={`/courses/${courseId}/lesson/${lastLesson.lessonId}`}
        className="inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >Resume lesson→</a>
    </div>
);

}