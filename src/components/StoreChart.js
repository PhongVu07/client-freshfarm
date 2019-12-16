import React, {useState, useEffect} from "react";
import { Chart } from "react-google-charts";

export default function StoreChart() {
  return (
    <div>
      <Chart
        width={"100%"}
        height={"400px"}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={[
          ["x", "Sale", "View"],
          ["Monday", 0, 0],
          ["Tuesday", 10, 5],
          ["Wednesday", 23, 15],
          ["Thirstday", 17, 9],
          ["Friday", 18, 10],
          ["Saturday", 9, 5],
          ["Sunday", 11, 3],
        ]}
        options={{
          hAxis: {
            title: ""
          },
          vAxis: {
            title: "Count"
          },
          series: {
            1: { curveType: "function" }
          }
        }}
        rootProps={{ "data-testid": "2" }}
      />
    </div>
  );
}
