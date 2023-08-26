import React, { useState } from 'react';
import RatingUI from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { toast } from 'react-toastify';

const Rating = ({ productId }) => {
  const [value, setValue] = useState(null);
  const [hover, setHover] = useState(-1);
  const token = localStorage.getItem("token")
  const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  };

  const getLabelText = (value) => {
    return labels[value];
  };

  const handleRatingSubmit = async () => {
    if (value !== null) {
      try {
        const response = await fetch(`http://localhost:8000/api/ratings`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            product_id: productId,
            rating: value,
          }),
        });

        const data = await response.json();
        console.log(data);

        toast.success('Rating submitted successfully');
      } catch (error) {
        console.error('Error submitting rating:', error);
        toast.error('Failed to submit rating');
      }
    } else {
      toast.warn('Please select a rating before submitting');
    }
  };

  return (
    <div className="mt-4">
      <h3 className="font-bold text-blue-300 mb-2">Rate This Product:</h3>
      <RatingUI
        name="hover-feedback"
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>
          {labels[hover !== -1 ? hover : value]}
          <button
            className="ml-2 text-blue-500 hover:underline cursor-pointer"
            onClick={handleRatingSubmit}
          >
            Submit
          </button>
        </Box>
      )}
    </div>
  );
};

export default Rating;
