"use client";

import { useModal } from "@/components/ModalProvider";
import { RootState } from "@/store";
import { enroll, unenroll } from "@/store/enrollmentSlice";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { enrollCourse,unenrollCourse } from "@/app/actions/enroll";

type Course={
  id:string;
  title:string;
  description:string;
  level:string;
}

export function CourseCard({ course } : {course : Course}) {
  const { openModal } = useModal();
  const dispatch=useDispatch();
  const enrolledIds=useSelector(
    (state:RootState)=>state.enrollment.enrolledCourseIds
  );

  const isEnrolled=enrolledIds.includes(course.id);

  async function toggleEnrollment(){
    if(isEnrolled){
      //db
      await unenrollCourse(course.id);
      //redux
      dispatch(unenroll(course.id));
    }else{
      //db
      await enrollCourse(course.id);
      //redux
      dispatch(enroll(course.id));
    }
  }

  return (
    <div className="bg-white shadow rounded p-5 border border-gray-200">
      <h2 className="text-xl font-semibold">{course.title}</h2>
      <p className="text-gray-600 mt-2">{course.description}</p>
      <span className="mt-4 inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm">
        {course.level}
      </span>

      <button
        onClick={() =>
          openModal(
            <div>
              <h1 className="text-2xl font-bold">{course.title}</h1>
              <p className="mt-2">{course.description}</p>
            </div>
          )
        }
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        View Details
      </button>

      <button
      onClick={toggleEnrollment}
      className={`mt-3 w-full px-4 py-2 rounded text-white ${isEnrolled ? "bg-red-600 hover:bg-red-700" :"bg-green-600 hover:bg-green-700"}`
    }
      >
        {isEnrolled ? "Unenroll":"Enroll"}
      </button>

        <Link href={`/courses/${course.id}`}
        className="mt-4 ml-5 inline-block text-blue-600 hover:underline"
        >
          Go to Course →
        </Link>
    </div>
  );
}