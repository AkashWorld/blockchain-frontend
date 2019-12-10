import React from "react";
import ReactEcharts from "echarts-for-react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import "./user-descriptor.css";

const LG_DATA = gql`
  {
    getPaginatedDescriptors(unit: "lb", start: 0, count: 100) {
      value
      unixTimestamp
    }
  }
`;

function DATA_FUNCTION() {
  const { loading, error, data } = useQuery(LG_DATA);

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
  return { status, result: data.getPaginatedDescriptors };
}

function GENDER_OBJECT(Gender) {
  this.gender = Gender;
}
// gender array

function weightRange(value, weightRangeArray) {
  let indx;
  if (value >= 40 && value <= 50) {
    weightRangeArray[0] = weightRangeArray[0] + 1;
    indx = value;
  } else if (value >= 51 && value <= 100) {
    weightRangeArray[1] = weightRangeArray[1] + 1;
    indx = value;
  } else if (value >= 101 && value <= 150) {
    weightRangeArray[2] = weightRangeArray[2] + 1;
    indx = value;
  } else if (value >= 151 && value <= 200) {
    weightRangeArray[3] = weightRangeArray[3] + 1;
    indx = value;
  } else if (value >= 201 && value <= 300) {
    weightRangeArray[4] = weightRangeArray[4] + 1;
    indx = value;
  } else if (value >= 301) {
    weightRangeArray[5] = weightRangeArray[5] + 1;
    indx = value;
  } else {
    indx = 0;
  }
  return indx;
}

export function LineGraph() {
  let obj = DATA_FUNCTION();

  if (obj.status.isLoading)
    return (
      <div>
        <h3>Loading...</h3>
        <div className="loader"></div>
      </div>
    );

  if (obj.status.isError)
    return (
      <div>
        <h3>Oops! Something went wrong</h3>
      </div>
    );
  else if (obj.status.isData === true) {
    let timelist = [];
    let count = 4;
    let weightArray = [];
    let GENDER_ARRAY = [];
    // Generated gender randomly
    for (let i = 0; i < obj.result.length; i++) {
      let randGen = Math.floor(Math.random() * 2);
      let newGender = "";
      if (randGen) {
        newGender = "Male";
      } else {
        newGender = "Female";
      }
      let newWTobject = new GENDER_OBJECT(newGender);
      GENDER_ARRAY.push(newWTobject);
    }
    for (let i = 0; i < obj.result.length; i++) {
      let unixTime = obj.result[i].unixTimestamp;
      let startDate = new Date(unixTime * 1000);
      let month = startDate.getMonth();
      let year = startDate.getFullYear();
      let dateString = month + 1 + "-" + year;
      timelist[i] = dateString;
      count = count + 4;
    }
    for (let j = 0; j < obj.result.length; j++) {
      weightArray[j] = obj.result[j].value;
    }
    let usergender;
    let weightIndx; // used to determine users weight index
    let rangeLength = 11;
    let rangeArrayMale = new Array(rangeLength);
    rangeArrayMale.fill(0);
    let rangearrayf = new Array(rangeLength);
    rangearrayf.fill(0);

    let weightIndex;
    let userValue;
    let currentValue = obj.result.length - 1;
    for (let i = 0; i < obj.result.length - 1; i++) {
      if (GENDER_ARRAY[i].gender === "Male") {
        weightIndex = weightRange(weightArray[i], rangeArrayMale);
      } else if (GENDER_ARRAY[i].gender === "Female") {
        weightIndex = weightRange(weightArray[i], rangearrayf);
      }

      if (i === currentValue - 1) {
        weightIndx = weightIndex;
        usergender = GENDER_ARRAY[0].gender;
        userValue = obj.result[i + 1].value;
        console.log(userValue);
      }
    }

    // Determine visibility of pin based on gender
    let pincolorm;
    let pincolorf;

    if (usergender === "Male") {
      pincolorm = "#8186d5";
      pincolorf = "#00000000";
    } else if (usergender === "Female") {
      pincolorm = "#ddb6c6";
      pincolorf = "#00000000";
    }
    return (
      <ReactEcharts
        style={{ height: "350px", width: "750px" }}
        option={{
          xAxis: {
            type: "category",
            name: "Time",
            nameGap: 30,
            nameTextStyle: { fontWeight: "bold" },
            data: timelist
          },
          title: {
            left: "center",
            text: "Current User Weight:" + userValue,
            textStyle: { color: "#151965" }
          },
          toolbox: {
            feature: {
              saveAsImage: { title: "\n\nSave" }
            }
          },
          series: [
            {
              type: "line",
              markPoint: {
                symbol: "pin",
                itemStyle: { color: pincolorm },
                data: [
                  {
                    name: "You",
                    value: userValue,
                    xAxis: timelist[currentValue],
                    yAxis: weightIndx
                  }
                ]
              }
            },
            {
              type: "line",
              markPoint: {
                symbol: "pin",
                itemStyle: { color: pincolorf },
                data: [
                  {
                    name: "You",
                    value: userValue,
                    xAxis: timelist[currentValue],
                    yAxis: weightIndx
                  }
                ]
              }
            },
            {
              name: "Weight",
              type: "line",
              data: weightArray
            }
          ],
          tooltip: {
            trigger: "axis",
            data: GENDER_ARRAY.map(function(GENDER_OBJECT) {
              return GENDER_OBJECT[0];
            })
          },
          yAxis: {
            padding: [0, 20, 20, 20],
            name: "Weight",
            nameLocation: "end",
            nameGap: 35,
            nameTextStyle: { fontWeight: "bold" },
            type: "value"
          },
          visualMap: {
            show: true,
            type: "piecewise",
            itemGap: 15,
            itemWidth: 9,
            padding: [0, 0, 0, 5],
            textStyle: {
              color: "black",
              width: 0
            },
            top: 40,
            right: 10,
            pieces: [
              {
                gt: 0,
                lte: 50,
                color: "#61BB46"
              },
              {
                gt: 50,
                lte: 100,
                color: "#FDB827"
              },
              {
                gt: 100,
                lte: 150,
                color: "#F5821F"
              },
              {
                gt: 150,
                lte: 200,
                color: "#E03A3E"
              },
              {
                gt: 200,
                lte: 300,
                color: "#963D97"
              },
              {
                gt: 300,
                color: "#009DDC"
              }
            ],
            outOfRange: {
              color: "#999"
            }
          },
          textStyle: {
            color: "black"
          },
          dataZoom: [
            {
              backgroundColor: "black",

              textStyle: {
                color: "white"
              },
              startValue: "2013-06-01"
            },
            {
              type: "inside"
            }
          ],
          backgroundColor: "white"
        }}
      />
    );
  } else
    return (
      <div>
        <h3> System Error: Sorry for Inconvenience</h3>
      </div>
    );
}
