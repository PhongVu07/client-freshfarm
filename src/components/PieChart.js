import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";

export default function StoreChart(props) {
  const [dataToShow, setDataToShow] = useState([["Data", "Count"]]);
  // console.log(props.record);
  useEffect(() => {
    getDataToShow();
  }, [props.saleCount]);

  const getDataToShow = () => {
    if (props.saleCount) {
        const test = [["Data", "Count"]];
        test.push(["View", props.viewCount-props.saleCount]);
        test.push(["Sale", props.saleCount])
        setDataToShow(test);
    }}

  // console.group(dataToShow);

  return (
    <div>
      <Chart
        width={"60vw"}
        height={"300px"}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={dataToShow}
        options={{
          title: "Sale percentage on views"
        }}
        rootProps={{ "data-testid": "1" }}
      />
    </div>
  );
}
