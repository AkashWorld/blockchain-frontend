import React from "react";
import ReactEcharts from "echarts-for-react"; // or var ReactEcharts = require('echarts-for-react');
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

//GraphQL ----------------------------------------------------------------
const GET_POUNDS = gql`
      {
        getPaginatedDescriptors(unit: "lb", start: 0, count: 500)
        {value}
      }
      `;

function POUNDS() {
  const { loading, error, data } = useQuery(GET_POUNDS);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
      data.getPaginatedDescriptors
  );
}
//------------------------------------------------------------------------------
// Increment range and record updated index
function rangeIncrement(valuew, rangearray) {
  let indx;
  if (valuew >= 61 && valuew <= 80) {
    rangearray[0] = rangearray[0] + 1;
    indx = 0;
  } else if (valuew >= 81 && valuew <= 100) {
    rangearray[1] = rangearray[1] + 1;
    indx = 1;
  } else if (valuew >= 101 && valuew <= 120) {
    rangearray[2] = rangearray[2] + 1;
    indx = 2;
  } else if (valuew >= 121 && valuew <= 140) {
    rangearray[3] = rangearray[3] + 1;
    indx = 3;
  } else if (valuew >= 141 && valuew <= 160) {
    rangearray[4] = rangearray[4] + 1;
    indx = 4;
  } else if (valuew >= 161 && valuew <= 180) {
    rangearray[5] = rangearray[5] + 1;
    indx = 5;
  } else if (valuew >= 181 && valuew <= 200) {
    rangearray[6] = rangearray[6] + 1;
    indx = 6;
  } else if (valuew >= 201 && valuew <= 220) {
    rangearray[7] = rangearray[7] + 1;
    indx = 7;
  } else if (valuew >= 221 && valuew <= 240) {
    rangearray[8] = rangearray[8] + 1;
    indx = 8;
  } else if (valuew >= 241 && valuew <= 260) {
    rangearray[9] = rangearray[9] + 1;
    indx = 9;
  } else if (valuew >= 261 && valuew <= 280) {
    rangearray[10] = rangearray[10] + 1;
    indx = 10;
  } else if (valuew >= 281 && valuew <= 300) {
    rangearray[11] = rangearray[11] + 1;
    indx = 11;
  } else {
    indx = 100;
  }
  return indx;
}

function processDataList(arrData) {
  // Range arrays (m & f) to built dataset
  let rangeLength = 12;
  let rangearraym = new Array(rangeLength);
  rangearraym.fill(0);
  let rangearrayf = new Array(rangeLength);
  rangearrayf.fill(0);

  let usergender; // determine pin colors
  let userindx; // user's pin location
  let u1value; // user's weight displayed with pin
  let tempindx;

  // increment range based on gender, store user's info for pin
  for (let i = 0; i < arrData.length; i++) {
      tempindx = rangeIncrement(arrData[i].value, rangearraym);
      tempindx = rangeIncrement(arrData[i].value, rangearrayf);

    if (i == 0) {
      userindx = tempindx;
      usergender = "Male";
      u1value = arrData[i].value;
    }
  }

  // Dataset used to build graph
  let arraydata = [
    ["Range", "Male", "Female"],
    ["61-80", rangearraym[0], rangearrayf[0]],
    ["81-100", rangearraym[1], rangearrayf[1]],
    ["101-120", rangearraym[2], rangearrayf[2]],
    ["121-140", rangearraym[3], rangearrayf[3]],
    ["141-160", rangearraym[4], rangearrayf[4]],
    ["161-180", rangearraym[5], rangearrayf[5]],
    ["181-200", rangearraym[6], rangearrayf[6]],
    ["201-220", rangearraym[7], rangearrayf[7]],
    ["221-240", rangearraym[8], rangearrayf[8]],
    ["241-260", rangearraym[9], rangearrayf[9]],
    ["261-280", rangearraym[10], rangearrayf[10]],
    ["281-300", rangearraym[11], rangearrayf[11]]
  ];

  // Determine color (white v. transparent)
  let pincolorm;
  let pincolorf;
  if (usergender == "Male") {
    pincolorm = "white";
    pincolorf = "#00000000";
  } else if (usergender == "Female") {
    pincolorm = "#00000000";
    pincolorf = "white";
  }

  return {
    dataset: arraydata,
    index: userindx,
    value: u1value,
    pincolorm,
    pincolorf
  };
}

export function WeightRangeChart(){
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
            saveAsImage: {title: '\n\nSave'}
          }
        },
        backgroundColor: "transparent",
        legend: {
          right: "10%",
          top: "10%"
        },
        tooltip: {},
        dataset: {
          source: processDataList(POUNDS()).dataset
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
              label: {show: false},
              itemStyle: { color: processDataList(POUNDS()).pincolorm },
              data: [
                {
                  name: "You",
                  value: processDataList(POUNDS()).value,
                  xAxis: processDataList(POUNDS()).index,
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
              label: {show: false},
              itemStyle: { color: processDataList(POUNDS()).pincolorf },
              data: [
                {
                  name: "You",
                  value: processDataList(POUNDS()).value,
                  xAxis: processDataList(POUNDS()).index,
                  yAxis: 0
                }
              ]
            }
          }
        ]
      }}
    />
  );
    
  }