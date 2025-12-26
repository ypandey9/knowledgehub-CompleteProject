"use client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { completeCourse } from "@/app/actions/completeCourse";

export default function CourseProgressBar(
    {
        courseId,
        totalLessons,
    } : {
        courseId:string;
        totalLessons:number;
    }
) {

    // ✅ Get completed lessons from Redux

    const completedLessons=useSelector(

        (state:RootState)=>state.progress.completed[courseId]
    ) || [];

    const completedCount=completedLessons.length;

    const percent=totalLessons > 0 ? Math.round((completedCount/totalLessons)*100):0;

//const[completed,setCompleted]=useState<string[]>([]);

useEffect(()=>{
    if(completedLessons.length===totalLessons && totalLessons>0){
        completeCourse(courseId);
    }
},[completedLessons.length,totalLessons,courseId]);

return (
    <div className="mt-5">
        <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Course Progress</span>
                <span className="text-sm font-medium text-gray-700">Progress: {completedCount} / {totalLessons} lessons ({percent}%)</span> 
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                className="bg-blue-600 h-3 rounded-full transition-all"
                style={{width:`${percent}%`}}>
                </div>
            </div>
        </div>
    </div>
);

}