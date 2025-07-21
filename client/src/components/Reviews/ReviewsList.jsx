import React from "react";
import ReviewCard from "./ReviewCard";

const ReviewList = ({ reviews }) => {
  console.log("reviews:", reviews);
  if (!reviews || reviews.length === 0) {
    return <p>No reviews yet.</p>;
  }

  return (
    <div className="review-list">
      <h3>Reviews:</h3>
      {reviews.map((review, index) => (
        <ReviewCard key={index} review={review} />
      ))}
    <button>All reviews</button>
    </div>
  );
};

export default ReviewList;
