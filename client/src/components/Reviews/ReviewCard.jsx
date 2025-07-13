import React from "react";
import "./review.css"; 

const ReviewCard = ({ review }) => {
  if (!review) return null;

  const { userName, rating, comment, date } = review;

  const formattedDate = new Date(date).toLocaleDateString();

  return (
    <div className="review-card">
      <div className="review-header">
        <h4 className="review-username">{userName || "Anonymous"}</h4>
        <span className="review-rating">
          {"⭐".repeat(rating)}{" "}
          <span className="rating-number">({rating}/5)</span>
        </span>
      </div>

      <p className="review-date">{formattedDate}</p>

      <p className="review-comment">"{comment}"</p>
    </div>
  );
};

export default ReviewCard;
