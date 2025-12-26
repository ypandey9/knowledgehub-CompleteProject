"use client";
import { RootState } from "@/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function MyCoursesClient(){
    const enrolledIds=useSelector(
        (state:RootState)=>state.enrollment.enrolledCourseIds
    );

    const[courses,setCourses]=useState<any[]>([]);
    

    useEffect(()=>{
        async function fetchCourses(){
            const res=await fetch("/api/courses");
            const allCourses=await res.json();

            const filtered=allCourses.filter((c:any)=>
                enrolledIds.includes(c.id.toString()));

            setCourses(filtered);
        }
        fetchCourses();
    },[enrolledIds]);

    if(enrolledIds.length===0) {
        return (
            <div className="mt-10 p-6 bg-white rounded shadow text-center">
                <p className="text-gray-700 text-lg">
                    You have not enrolled in any courses yet.
                </p>
                <Link
                href="/courses"
                className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded"
                >Browse Courses</Link>
            </div>
        );
    }
        if(courses===null) return <p className="mt-8 text-gray-600">Loading your courses...</p>;
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {courses.map((course:any)=>(
                <div
                key={course.id}
                className="bg-white shadow rounded p-5 border border-gray-200"
                >
                    <h2 className="text-xl font-semibold">{course.title}</h2>
                    <p className="text-gray-600 mt-2">{course.description}</p>

                    <div className="mt-4">
                        <Link 
                        href={`/courses/${course.id}`}
                        className="bg-green-600 text-white px-4 py-2 rounded inline-block hover:bg-green-700"
                        >
                            Continue Learning
                        </Link>

                    </div>
                </div>
            ))}
        </div>
    );
}