import React, { useState } from "react";
import "./review.css";

const AddReview = ({ onSubmit }) => {
 const [rating, setRating] = useState(5);
 const [reviewText, setReviewText] = useState("");
 const [error, setError] = useState(null);
 const [loading, setLoading] = useState(false);

 const handleSubmit = async (e) => {
   e.preventDefault();
   if (!reviewText.trim()) {
     setError("Review text is required.");
     return;
   }
   if (rating < 1 || rating > 5) {
     setError("Rating must be between 1 and 5.");
     return;
   }
   setError(null);
   setLoading(true);

   try {
     await onSubmit({ rating, comment: reviewText });
     setReviewText("");
     setRating(5);
   } catch (err) {
     setError("Failed to submit review. Please try again.");
   } finally {
     setLoading(false);
   }
 };


  return (
    <form onSubmit={handleSubmit} className="add-review-form">
      <h3>Add a Review</h3>

      <label>
        Rating:
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          disabled={loading}
        >
          {[5, 4, 3, 2, 1].map((num) => (
            <option key={num} value={num}>
              {num} Star{num > 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </label>

      <label>
        Review:
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          rows={4}
          disabled={loading}
          required
        />
      </label>

      {error && <p className="add-review-error">{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
};

export default AddReview;
