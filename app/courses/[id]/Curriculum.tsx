"use client";

import { RootState } from "@/store";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Curriculum({ courseId,curriculum }: any){

    const completed=useSelector(
        (state:RootState)=>state.progress.completed[courseId] || []
    );

   return (
    <div className="mt-4">
      {curriculum.map((chapter: any, index: number) => (
        <div key={index} className="mb-6">
          <h3 className="font-semibold text-lg">{chapter.title}</h3>

          <ul className="ml-6 mt-2 space-y-2">
            {chapter.lessons.map((lesson: any, idx: number) => {
              const lessonId = `lesson-${index}-${idx}`;
              const done = completed.includes(lessonId);

              return (
                <li key={lessonId} className="flex items-center gap-2">
                  <span className={done ? "text-green-600" : "text-gray-600"}>
                    {done ? "✔" : "•"}
                  </span>
                  {lesson}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );

}

    function ModuleItem({ module }: { module:any }) {
        const[open,setOpen]=useState(false);
        return (
            <div className="border border-gray-300 rounded">
                <button 
                onClick={()=>setOpen(!open)}
                className="w-full flex justify-between items-center px-4 py-3 bg-gray-100"
                >
                 <span className="font-semibold">{module.title}</span> 
                 <span>{open ? "🔼":"🔽"}</span>  
                </button>
                {open && (
                    <div className="px-4 py-3 bg-white space-y-2">
                        {module.lessons.map((lesson:any,i:number)=>(
                            <div key={i} className="text-gray-700" >
                                { lesson }
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

