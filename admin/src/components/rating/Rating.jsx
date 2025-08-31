import React, { useState } from "react";

const Rating = ({ maxRating = 5, initialRating = 0, onRatingChange, className }) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  const handleClick = (rate) => {
    setRating(rate);
    if (onRatingChange) {
      onRatingChange(rate);
    }
  };

  return (
    <div className={className}>
      {Array.from({ length: maxRating }, (_, i) => i + 1).map((rate) => (
        <button
          key={rate}
          className={`text-3xl focus:outline-none ${
            (hover || rating) >= rate ? "text-yellow-400" : "text-gray-300"
          }`}
          onClick={() => handleClick(rate)}
          onMouseEnter={() => setHover(rate)}
          onMouseLeave={() => setHover(0)}
          type="button"
        >
          ★
        </button>
      ))}
    </div>
  );
};

export default Rating;