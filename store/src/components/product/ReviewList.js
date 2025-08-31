import React from 'react';

// Single Review Item Component
const ReviewItem = ({ review }) => {

  console.log("Review By ", review);
    
  return (
    <div className="border-b border-gray-200 py-4">
      <div className="flex flex-col lg:flex-row justify-between mb-2">
        <div className="flex items-center">
          {/* Display Stars */}
          <div className="text-yellow-500 text-lg">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i}>{i < review.rating ? '★' : '☆'}</span>
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">by {review?.customer?.name || "MSS Customer"}</span>
        </div>
        <span className="text-sm text-gray-500">{review.createdAt.slice(0,10)}</span>
      </div>
      <p className="text-gray-700">{review.comment}</p>
    </div>
  );
};

// Review List Component
const ReviewList = ({ reviews }) => {
  return (
    <div className="w-full mx-auto p-6 mt-4 bg-white rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>

      {/* If no reviews */}
      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet. Be the first to leave one!</p>
      ) : (
        <div>
          {reviews.map((review, index) => (
            <ReviewItem key={index} review={review} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewList;