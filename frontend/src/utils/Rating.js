import React, { useEffect, useState } from "react";
import RatingUI from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { toast } from "react-toastify";

const Rating = ({ productId }) => {
  const [value, setValue] = useState(null);
  const [hover, setHover] = useState(-1);
  const [review, setReview] = useState("");
  const [ratings, setRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(null);

  const token = localStorage.getItem("token");

  const labels = {
    1: "Useless",

    2: "Poor",

    3: "Ok+",

    4: "Good",

    5: "Excellent",
  };
  const getLabelText = (value) => {
    return labels[value];
  };

  useEffect(() => {
    fetchRatings();
  }, []);

  const fetchRatings = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/ratings/${productId}`
      );
      const data = await response.json();
      console.log(data);
      setRatings(data.ratings);
      console.log(ratings);

      const totalRating = data.ratings.reduce(
        (total, rating) => total + rating.rating,
        0
      );
      const avgRating = totalRating / data.ratings.length;
      setAverageRating(avgRating);
    } catch (error) {
      console.error("Error fetching ratings:", error);
    }
  };

  const handleRatingSubmit = async () => {
    if (value !== null) {
      try {
        const response = await fetch(`http://localhost:8000/api/ratings`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            mode: "cors",
          },
          body: JSON.stringify({
            product_id: productId,
            rating: value,
            review: review,
            user_name: localStorage.getItem("user_name"),
          }),
        });

        const data = await response.json();
        console.log(data);

        toast.success("Rating and review submitted successfully");
      } catch (error) {
        console.error("Error submitting rating and review:", error);
        toast.error("Failed to submit rating and review");
        document.getElementById("submit-button").disabled = false;
      }
    } else {
      toast.warn("Please select a rating before submitting");
    }
  };
  const renderAverageRatingStars = () => {
    if (averageRating !== null) {
      const totalRatingsCount = ratings.length; // Get the total number of ratings
      return (
        <div className="mt-4">
          <h3 className="font-bold text-blue-300">Average Rating:</h3>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <RatingUI
              name="average-rating"
              value={averageRating}
              precision={0.1}
              readOnly
              emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            <p className="ml-2">
          {averageRating.toFixed(2)}     ({totalRatingsCount} Users)
            </p>
          </Box>
        </div>
      );
    }
    return null;
  };
  const renderIndividualUserRatings = () => {
    return (
      <div>
        <h3 className="font-bold text-blue-300 mt-4">All Ratings:</h3>
        <ul>
          {ratings.map((rating) => (
            <li
              key={rating.id}
              className="bg-slate-100 px-5 py-3 mb-3 rounded-lg shadow-md"
            >
              <h2 className="text-lg font-semibold mb-2">{rating?.user_name}</h2>
              <p className="mb-1">
                Rating:{" "}
                <RatingUI
                  name={`user-rating-${rating.id}`}
                  value={rating?.rating}
                  precision={0.1}
                  readOnly
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
              </p>
              <p className="mb-0">Review: {rating?.review}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="mt-4">
      <h3 className="font-bold text-blue-300 mb-2">Rate This Product:</h3>
      <RatingUI
        name="hover-feedback"
        value={value}
        precision={1}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />

      <textarea
        className="mt-2 p-2 border rounded w-full"
        placeholder="Write your review here..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      {value !== null && (
        <Box sx={{ mt: 2 }}>
          {labels[hover !== -1 ? hover : value]}
          <button
            id="submit-button"
            className="ml-2 text-blue-500 hover:underline cursor-pointer"
            onClick={handleRatingSubmit}
          >
            Submit
          </button>
        </Box>
      )}

      {averageRating !== null && (
        <div className="mt-4">
          <h3 className="font-bold text-blue-300">Average Rating:</h3>
          {renderAverageRatingStars()}

        </div>
      )}
      <h3 className="font-bold text-blue-300 mt-4">All Ratings:</h3>
      <div>
      {renderIndividualUserRatings()}

      </div>
    </div>
  );
};

export default Rating;
