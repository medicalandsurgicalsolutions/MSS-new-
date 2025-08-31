import useReviewSubmit from '@hooks/useReviewSubmit';
import useUtilsFunction from '@hooks/useUtilsFunction';
import React, { useState } from 'react';

const Review = ({customer, product, order, ratings}) => {
    
    const {
        rating,
        setRating,
        register,
        loading,
        handleSubmit,
        submitHandler,
    } = useReviewSubmit({
        customer:customer?.id || "",
        product:product?._id || "",
        order:order?.orders || []
    });

  const { showingTranslateValue } = useUtilsFunction();
  
  const ratingCounts = ratings.reduce((acc, review) => {
    const rating = review.rating;
    acc[rating] = acc[rating] ? acc[rating] + 1 : 1;
    return acc;
  }, {});

  const maxCount = Math.max(...Object.values(ratingCounts), 1);

 
  return (
    <div className="w-full mx-auto mt-0 pt-24 lg:pt-36 p-6 rounded-lg">
      {/* Reviews Summary */}
      <div className="flex flex-col lg:flex-row justify-between items-start mb-6 space-y-6 lg:space-y-0 lg:space-x-6">
        {/* Star ratings summary */}
        <div className="lg:w-1/2 w-full">
          <h2 className="text-xl font-semibold mb-2">Reviews ({ratings?.length})</h2>
          <div className="flex items-center mb-4">
            {/* Star ratings */}
            <div className="flex">
              <span className="text-yellow-500 text-2xl">★★★★★</span>
            </div>
          </div>
          {/* Rating bar and star breakdown */}
          
          <div className="space-y-2">
            {Array.from({ length: 5 }, (_, index) => {
            const stars = 5 - index; // Stars start from 5 to 1
            const count = ratingCounts[stars] || 0; // Default to 0 if no reviews for this rating
    
            return (
                <div key={stars} className="flex items-center space-x-2">
                {/* Star display */}
                <span className="text-yellow-500">
                    {Array.from({ length: 5 }, (_, i) => (
                    <span key={i}>{i < stars ? '★' : '☆'}</span>
                    ))}
                </span>
    
                {/* Progress bar based on the count */}
                <span className="flex-1 bg-gray-200 h-2 rounded-full">
                    <span
                    className="bg-yellow-500 h-2 block rounded-full"
                    style={{ width: `${(count / maxCount) * 100}%` }} // Adjust width based on some scale
                    ></span>
                </span>
    
                {/* Display count */}
                <span>{count}</span>
                </div>
            );
            })}
          </div>
        </div>

        {/* Review Form */}
        <div className="lg:w-1/2 w-full">
          <h3 className="text-xl font-semibold">Be the first to review "{showingTranslateValue(product?.title)}"</h3>
          <form className="mt-4" onSubmit={handleSubmit(submitHandler)}>
            {/* Rating input */}
            <div className="flex space-x-2 mb-4">
              {Array.from({ length: 5 }, (_, index) => (
                <span
                  key={index}
                  className={`text-2xl cursor-pointer ${
                    rating > index ? 'text-yellow-500' : 'text-gray-300'
                  }`}
                  onClick={() => setRating(index + 1)}
                >
                  ★
                </span>
              ))}
            </div>

            {/* Review textarea */}
            <div className="mb-4">
              <label htmlFor="review" className="block text-gray-700">
                Your Review
              </label>
              <textarea
                {...register("comment", {
                    required: "Comment is required!",
                })}
                name={"comment"}
                id="review"
                rows="4"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              ></textarea>
            </div>

            {loading ? (
              <button
                disabled={loading}
                type="submit"
                className="inline-flex items-center justify-center cursor-pointer w-full text-center py-3 rounded bg-cyan-500 text-white hover:bg-cyan-600 transition-all focus:outline-none my-1"
              >
                <img
                  src="/loader/spinner.gif"
                  alt="Loading"
                  width={20}
                  height={10}
                />
                <span className=" ml-2 font-light">
                  Processing
                </span>
              </button>
            ) : (
              <button
                disabled={loading}
                type="submit"
                className="w-full text-center py-3 rounded bg-cyan-500 text-white hover:bg-cyan-600 transition-all focus:outline-none my-1"
              >
                Add Review
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Review;
