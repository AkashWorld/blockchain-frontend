import React from "react";
import ReactEcharts from "echarts-for-react"; // or var ReactEcharts = require('echarts-for-react');
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import "./user-descriptor.css";

//GraphQL ----------------------------------------------------------------
const GLOBAL_POUNDS_QUERY = gql`
  {
    getPaginatedDescriptorsGlobal(unit: "lb", start: 0, count: 1000) {
      value
    }
  }
`; // also need gender, easy if added in descriptor

function GET_GLOBAL_POUNDS() {
  const { loading, error, data } = useQuery(GLOBAL_POUNDS_QUERY);

  let status = { isLoading: false, isError: false, isData: false };

  if (loading) {
    status.isLoading = true;
    return { status, result: "Loading..." };
  }

  if (error) {
    status.isError = true;
    return { status, result: `Error! ${error.message}` };
  }

  status.isData = true;
  return { status, result: data.getPaginatedDescriptorsGlobal };
}

const USER_POUNDS_QUERY = gql`
  {
    getLatestUnitValue(unit: "lb")
  }
`; // also need gender, can the return type of this be changed to descriptor?

function GET_USER_POUNDS() {
  const { loading, error, data } = useQuery(USER_POUNDS_QUERY);

  let status = { isLoading: false, isError: false, isData: false };

  if (loading) {
    status.isLoading = true;
    return { status, result: "Loading..." };
  }

  if (error) {
    status.isError = true;
    return { status, result: `Error! ${error.message}` };
  }

  status.isData = true;
  return { status, result: data.getLatestUnitValue };
}
//------------------------------------------------------------------------------

// Increment range and record updated index
function rangeIncrement(value, rangeArray) {
  let indx;
  if (value >= 61 && value <= 80) {
    rangeArray[0] = rangeArray[0] + 1;
    indx = 0;
  } else if (value >= 81 && value <= 100) {
    rangeArray[1] = rangeArray[1] + 1;
    indx = 1;
  } else if (value >= 101 && value <= 120) {
    rangeArray[2] = rangeArray[2] + 1;
    indx = 2;
  } else if (value >= 121 && value <= 140) {
    rangeArray[3] = rangeArray[3] + 1;
    indx = 3;
  } else if (value >= 141 && value <= 160) {
    rangeArray[4] = rangeArray[4] + 1;
    indx = 4;
  } else if (value >= 161 && value <= 180) {
    rangeArray[5] = rangeArray[5] + 1;
    indx = 5;
  } else if (value >= 181 && value <= 200) {
    rangeArray[6] = rangeArray[6] + 1;
    indx = 6;
  } else if (value >= 201 && value <= 220) {
    rangeArray[7] = rangeArray[7] + 1;
    indx = 7;
  } else if (value >= 221 && value <= 240) {
    rangeArray[8] = rangeArray[8] + 1;
    indx = 8;
  } else if (value >= 241 && value <= 260) {
    rangeArray[9] = rangeArray[9] + 1;
    indx = 9;
  } else if (value >= 261 && value <= 280) {
    rangeArray[10] = rangeArray[10] + 1;
    indx = 10;
  } else if (value >= 281 && value <= 300) {
    rangeArray[11] = rangeArray[11] + 1;
    indx = 11;
  } else {
    indx = 100;
  }
  return indx;
}

function rangeFinder(value) {
  let indx;
  if (value >= 61 && value <= 80) {
    indx = 0;
  } else if (value >= 81 && value <= 100) {
    indx = 1;
  } else if (value >= 101 && value <= 120) {
    indx = 2;
  } else if (value >= 121 && value <= 140) {
    indx = 3;
  } else if (value >= 141 && value <= 160) {
    indx = 4;
  } else if (value >= 161 && value <= 180) {
    indx = 5;
  } else if (value >= 181 && value <= 200) {
    indx = 6;
  } else if (value >= 201 && value <= 220) {
    indx = 7;
  } else if (value >= 221 && value <= 240) {
    indx = 8;
  } else if (value >= 241 && value <= 260) {
    indx = 9;
  } else if (value >= 261 && value <= 280) {
    indx = 10;
  } else if (value >= 281 && value <= 300) {
    indx = 11;
  } else {
    indx = 100;
  }
  return indx;
}

function processDataList(arrData) {
  // Range arrays (m & f) to built dataset
  let rangeLength = 12;
  let rangeArrayMale = new Array(rangeLength);
  rangeArrayMale.fill(0);
  let rangeArrayFemale = new Array(rangeLength);
  rangeArrayFemale.fill(0);

  // increment range based on gender, store user's info for pin
  for (let i = 0; i < arrData.length; i++) {
    rangeIncrement(arrData[i].value, rangeArrayMale);
    rangeIncrement(arrData[i].value, rangeArrayFemale);
  }

  // Dataset used to build graph
  let arrayData = [
    ["Range", "Male", "Female"],
    ["61-80", rangeArrayMale[0], rangeArrayFemale[0]],
    ["81-100", rangeArrayMale[1], rangeArrayFemale[1]],
    ["101-120", rangeArrayMale[2], rangeArrayFemale[2]],
    ["121-140", rangeArrayMale[3], rangeArrayFemale[3]],
    ["141-160", rangeArrayMale[4], rangeArrayFemale[4]],
    ["161-180", rangeArrayMale[5], rangeArrayFemale[5]],
    ["181-200", rangeArrayMale[6], rangeArrayFemale[6]],
    ["201-220", rangeArrayMale[7], rangeArrayFemale[7]],
    ["221-240", rangeArrayMale[8], rangeArrayFemale[8]],
    ["241-260", rangeArrayMale[9], rangeArrayFemale[9]],
    ["261-280", rangeArrayMale[10], rangeArrayFemale[10]],
    ["281-300", rangeArrayMale[11], rangeArrayFemale[11]]
  ];

  // Determine color based on gender (white v. transparent)
  let userGender = "Male"; //need from backend
  let pinColorMale;
  let pinColorFemale;
  if (userGender === "Male") {
    pinColorMale = "white";
    pinColorFemale = "#00000000";
  } else if (userGender === "Female") {
    pinColorMale = "#00000000";
    pinColorFemale = "white";
  }

  return {
    dataset: arrayData,
    pinColorMale,
    pinColorFemale
  };
}

export function WeightRangeChart() {
  let poundsGlobalResult = GET_GLOBAL_POUNDS();
  let poundsUserResult = GET_USER_POUNDS();

  if (poundsGlobalResult.status.isLoading || poundsUserResult.status.isLoading)
    return (
      <div>
        <h3>Loading...</h3>
        <div className="loader"></div>
      </div>
    );

  if (poundsGlobalResult.status.isError || poundsUserResult.status.isError)
    return (
      <div>
        <h3>Something went wrong</h3>
      </div>
    );
  else if (poundsGlobalResult.status.isData && poundsUserResult.status.isData)
    return (
      <ReactEcharts
        style={{ height: "350px", width: "750px" }}
        option={{
          title: {
            textAlign: "Auto",
            left: "center",
            top: "5%"
          },
          toolbox: {
            feature: {
              saveAsImage: { title: "\n\nSave" }
            }
          },
          backgroundColor: "transparent",
          legend: {
            right: "10%",
            top: "10%"
          },
          tooltip: {},
          dataset: {
            source: processDataList(poundsGlobalResult.result).dataset
          },
          xAxis: {
            type: "category",
            name: "Weight Range",
            nameLocation: "center",
            nameGap: 30,
            nameTextStyle: { fontWeight: "bold" }
          },
          yAxis: {
            name: "Count",
            nameTextStyle: { fontWeight: "bold" }
          },
          // Declare several bar series, each will be mapped
          // to a column of dataset.source by default.
          series: [
            {
              type: "bar",
              barGap: "0%",
              color: "#331c05",
              markPoint: {
                symbol: "pin",
                symbolSize: 30,
                label: { show: false },
                itemStyle: {
                  color: processDataList(poundsGlobalResult.result).pinColorMale
                },
                data: [
                  {
                    name: "You",
                    value: poundsUserResult.result,
                    xAxis: rangeFinder(poundsUserResult.result),
                    yAxis: 0
                  }
                ]
              }
            },

            {
              type: "bar",
              barGap: "0%",
              color: "#ee9ca7",
              markPoint: {
                symbol: "pin",
                symbolSize: 30,
                label: { show: false },
                itemStyle: {
                  color: processDataList(poundsGlobalResult.result)
                    .pinColorFemale
                },
                data: [
                  {
                    name: "You",
                    value: poundsUserResult.result,
                    xAxis: rangeFinder(poundsUserResult.result),
                    yAxis: 0
                  }
                ]
              }
            }
          ]
        }}
      />
    );
  else
    return (
      <div>
        <h3>Something went really wrong</h3>
      </div>
    );
}
