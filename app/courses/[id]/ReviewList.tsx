"use client";
import { useModal } from "@/components/ModalProvider";
import { REVIEWS } from "./reviews/data";
import { useEffect, useState } from "react";
import RatingBreakDown from "./RatingBreakdown";
export default function ReviewList({courseId} : {courseId:string}) {

  const {openModal,closeModal}=useModal();
  const [reviews,setReviews]=useState<any[]>([]);

  useEffect(()=>{
    const stored=localStorage.getItem(`reviews-${courseId}`);
    const localReviews=stored ? JSON.parse(stored) : [];

    const merged=[...REVIEWS.filter(r=>r.courseId===courseId),...localReviews];
    setReviews(merged);
  },[courseId]);

  //Handle Reviews Submission

  function openReviewForm() {
    openModal(
      <ReviewForm 
      courseId={courseId}
      onSubmit={(newReview)=>{
        setReviews((prev)=>[...prev,newReview]);

        const updated=[...reviews,newReview];
        localStorage.setItem(`reviews-${courseId}`,JSON.stringify(updated));
        closeModal();
      }}
      />
    );
  }

    // const courseReviews=REVIEWS.filter((r)=>r.courseId===courseId);
    // if(courseReviews.length===0) return <p className=" text-gray-600">No  reviews yet.</p>;

    // calculate average rating

    const avg=reviews.reduce((sum,r)=>sum+r.rating,0)/(reviews.length || 1);

    return (
        <div className="space-y-6 mt-4">
            <div className="p-4 bg-yellow-50 border rounded">
                <h3 className="text-xl font-semibold">
                    ⭐ {avg.toFixed(1)} / 5
                </h3>
                <p className="text-gray-600">{reviews.length} student reviews</p>
            </div>
        <div>
          <button
          onClick={openReviewForm}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Write a Review
          </button>
      </div>

      <RatingBreakDown reviews={reviews} />
            {/* Individual Reviews */}
      {reviews.map((review,index) => (
        <div
          key={index}
          className="border rounded p-4 shadow-sm bg-white"
        >
          <h4 className="font-semibold">{review.name}</h4>
          <p className="text-yellow-600 font-bold">
            {"⭐".repeat(review.rating)}
          </p>
          <p className="text-gray-700 mt-1">{review.comment}</p>
          <p className="text-gray-400 text-sm mt-1">{review.date}</p>
        </div>
      ))}
      {reviews.length===0 && (
        <p className="text-gray-600">No reviews yet.</p>
      )}
    </div>
    );
}


/*--------------------------------------------------------------
        REVIEW FORM COMPONENT
---------------------------------------------------------------*/

function ReviewForm({
  courseId,
  onSubmit,
} : {
  courseId:string;
  onSubmit:(review:any)=>void;
}) {
  const[name,setName]=useState("");
  const[rating,setRating]=useState(5);
  const[comment,setComment]=useState("");

  function handleSubmit() {
    if(!name || !comment) return;

    onSubmit({
      id:Date.now(),
      courseId,
      name,
      rating,
      comment,
      date:new Date().toISOString().split("T")[0],
    });
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-3">Write Review</h2>
       <label className="block mb-2 text-sm font-medium">Your Name</label>
        <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border p-2 rounded mb-3"
        placeholder="Enter your name"
      />

<label className="block mb-2 text-sm font-medium">Rating</label>
      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="w-full border p-2 rounded mb-3"
      >
        {[5, 4, 3, 2, 1].map((star) => (
          <option key={star} value={star}>
            {star} Stars
          </option>
        ))}
      </select>

      <label className="block mb-2 text-sm font-medium">Comment</label>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full border p-2 rounded mb-4"
        placeholder="Write your review..."
        rows={4}
      />

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
      >
        Submit Review
      </button>
    </div>
  );
}