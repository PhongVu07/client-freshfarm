import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";

export default function StoreChart(props) {
  const [dataToShow, setDataToShow] = useState([['x', 'Revenue']])
    // console.log(props.record);
  useEffect(() => {
      getDataToShow()
  }, [props.record])

  const getDataToShow = ()=> {
      if(props.record) {
        const test = [['x', 'Revenue']]
        for (let i = 0; i < props.record.length; i++) {
            test.push([props.record[i].date, props.record[i].total_price])
        }
        setDataToShow(test)
      }
  }

  // console.group(dataToShow);
  
  return (
    <div>
      <Chart
        width={"60vw"}
        height={"400px"}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data = {dataToShow}
        options={{
          title: "Revenue",
          hAxis: {
            title: "Time"
          },
          vAxis: {
            title: "Dong",
            viewWindow: { min: 0 }
          }
        }}
        rootProps={{ "data-testid": "1" }}
      />
    </div>
  );
}
