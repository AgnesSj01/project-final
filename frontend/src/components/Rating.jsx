import { useState, useEffect } from "react";
import { api } from "../utils/api";

const Rating = ({ recipeId, clickable = true }) => {
  const [reviews, setReviews] = useState([]);
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    api
      .get(`/recipes/${recipeId}/reviews`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error(err));
  }, [recipeId]);
  const average =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  const submitRating = (rating) => {
    api
      .post(`/recipes/${recipeId}/reviews`, { rating })
      .then((res) => setReviews([...reviews, res.data]))
      .catch((err) => console.error(err));
  };
  return (
    <div className="rating">
      {clickable ? (
        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={star <= userRating ? "star filled" : "star"}
              onClick={() => {
                setUserRating(star);
                submitRating(star);
              }}
            >
              ★
            </span>
          ))}
        </div>
      ) : (
        <p className="rating-short">★ {average.toFixed(1)}</p>
      )}
      {clickable && (
        <p>
          {average.toFixed(1)} / 5 ({reviews.length} reviews)
        </p>
      )}
    </div>
  );
};
export default Rating;
