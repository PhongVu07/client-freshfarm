import React from "react";

import "../css/star.css"

const Star = ({ selected = false, onClick = f => f }) => (
  <div className={selected ? "star selected" : "star"} onClick={onClick} />
);

const StarRating = (props) => {
  const numStar = [0, 1, 2, 3, 4];
  
  return (
    <div className="star-rating">
      {numStar.map((i) => (
        <Star
          key={i}
          selected={i < props.starsSelected}
          onClick={() => props.setStarSelected(i + 1)}
        />
      ))}
    </div>
  );
};

export default StarRating