import React from "react";

import "../css/star.css"

const JustStar = ({ selected = false, onClick = f => f }) => (
  <div className={selected ? "star-sm selected" : "star-sm"} onClick={onClick} />
);

const StarRatingSm = (props) => {
  const numStar = [0, 1, 2, 3, 4];
  
console.log(props.starsSelected, 'star-sm');
  return (
    <div className="star-rating">
      {numStar.map((i) => (
        <JustStar
          key={i}
          selected={i < props.starsSelected}
          // onClick={() => props.setStarSelected(i + 1)}
        />
      ))}
    </div>
  );
};

export default StarRatingSm