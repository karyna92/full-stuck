import React from "react";
import "./review.css"; 

const ReviewCard = ({ review }) => {
  if (!review) return null;

  const { user, rating, comment, date } = review;

  const formattedDate = new Date(date).toLocaleDateString();

  return (
    <div className="review-card">
      <div className="review-header">
        <h4 className="review-username">{user?.name || "Anonymous"}</h4>
        <div className="img-container">
          <img
            src={`http://localhost:5001/api/${user.avatar}`}
            alt="User Avatar"
          />
        </div>
      </div>
      <div>
        <p className="review-date">{formattedDate}</p>
        <p className="review-comment">"{comment}"</p>
      </div>
      <span className="review-rating">
        {"⭐".repeat(rating)}{" "}
        <span className="rating-number">({rating}/5)</span>
      </span>
    </div>
  );
};

export default ReviewCard;
