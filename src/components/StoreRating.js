import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";

export default function StoreRating(props) {
  const [ratingToShow, setRatingToShow] = useState([["x", "Revenue"]]);

  useEffect(() => {
    getDataToShow();
  }, [props.rating]);

  const getDataToShow = () => {
    if (props.rating) {
      const test = [["Rating", "Count"]];
      for (let i = 0; i < props.rating.length; i++) {
        test.push([props.rating[i].rating.toString().concat(' star'), props.rating[i].count]);
      }
      setRatingToShow(test);
    }
  };
  return (
    <div>
      <Chart
        width={"60vw"}
        height={"400px"}
        chartType="BarChart"
        loader={<div>Loading Chart</div>}
        data={ratingToShow}
        options={{
          chartArea: {
            width: "50%"
          },
          title: "Rating statistic"
        }}
        rootProps={{ "data-testid": "1" }}
      />
    </div>
  );
}
