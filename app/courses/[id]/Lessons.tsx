"use client";

import Link from "next/link";

export default function Lessons({ lessons } : { lessons:any[] }) {
 
    return (
        <div className="mt-4">
            {lessons.map((lesson,index)=>(
                <div 
                key={index}
                className="p-4 border rounded mb-3 bg-white shadow-sm flex justify-between items-center"
                >
                    <div>
                        <h3 className="font-semibold text-lg">{lesson.title}</h3>
                        <p className="text-gray-600 text-sm">{lesson.duration}</p>
                    </div>
                        <Link 
                        href={`/courses/${lesson.courseId}/lesson/${lesson.id}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                        Watch
                        </Link>
                    </div>
            ))}
        </div>
    );
}