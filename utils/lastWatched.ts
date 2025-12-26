"use client";
export function getLastWatched(courseId:string) {
    if(typeof window==="undefined") return null;
    const data=localStorage.getItem("lastWatched");
    if(!data) return null;

    const parsed=JSON.parse(data);

    if(parsed.courseId===courseId){
        return parsed.lessonId;
    }

    return null;
}