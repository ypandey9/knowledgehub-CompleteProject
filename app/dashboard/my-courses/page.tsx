import MyCoursesClient from "./MyCoursesClient";

export default function MyCoursesPage(){
    return (
        <div className="max-w-5xl mx-auto py-10">
            <h1 className="text-4xl font-bold mb-8">My Courses</h1>
            <MyCoursesClient />
        </div>
    );
}