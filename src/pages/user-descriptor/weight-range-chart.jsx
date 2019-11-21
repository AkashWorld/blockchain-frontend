import React from "react";
import ReactEcharts from "echarts-for-react"; // or var ReactEcharts = require('echarts-for-react');

// Expected Object
function Datapoint(uunit, uvalue, ulat, ulon, utime, ugender) {
  this.uunit = uunit;
  this.uvalue = uvalue;
  this.ulat = ulat;
  this.ulon = ulon;
  this.utime = utime;
  this.ugender = ugender;
}

// Random Data and Object Generation function
function GenRandomData() {
  let arrData = [];
  for (let i = 0; i < 100; i++) {
    let newValue = Math.floor(Math.random() * (300 - 61 + 1) + 61);
    let newUnit = "lb";
    let newLat = 0;
    let newLon = 0;
    let newTime = 0;
    let randGen = Math.floor(Math.random() * 2);
    let newGender = "";

    if (randGen) {
      newGender = "Male";
    } else {
      newGender = "Female";
    }

    let newDatapoint = new Datapoint(
      newUnit,
      newValue,
      newLat,
      newLon,
      newTime,
      newGender
    );
    arrData.push(newDatapoint);
  }
  return arrData;
}

// Will be replaced with call
let arrData = GenRandomData();

// Process the list for all necessary info
function processDataList(arrData) {
  // Range arrays (m & f) to built dataset
  let rangeLength = 12;
  let rangearraym = new Array(rangeLength);
  rangearraym.fill(0);
  let rangearrayf = new Array(rangeLength);
  rangearrayf.fill(0);

  // Increment range and record updated index
  function rangeIncrement(uobj, rangearray) {
    let indx;
    if (uobj.uvalue >= 61 && uobj.uvalue <= 80) {
      rangearray[0] = rangearray[0] + 1;
      indx = 0;
    } else if (uobj.uvalue >= 81 && uobj.uvalue <= 100) {
      rangearray[1] = rangearray[1] + 1;
      indx = 1;
    } else if (uobj.uvalue >= 101 && uobj.uvalue <= 120) {
      rangearray[2] = rangearray[2] + 1;
      indx = 2;
    } else if (uobj.uvalue >= 121 && uobj.uvalue <= 140) {
      rangearray[3] = rangearray[3] + 1;
      indx = 3;
    } else if (uobj.uvalue >= 141 && uobj.uvalue <= 160) {
      rangearray[4] = rangearray[4] + 1;
      indx = 4;
    } else if (uobj.uvalue >= 161 && uobj.uvalue <= 180) {
      rangearray[5] = rangearray[5] + 1;
      indx = 5;
    } else if (uobj.uvalue >= 181 && uobj.uvalue <= 200) {
      rangearray[6] = rangearray[6] + 1;
      indx = 6;
    } else if (uobj.uvalue >= 201 && uobj.uvalue <= 220) {
      rangearray[7] = rangearray[7] + 1;
      indx = 7;
    } else if (uobj.uvalue >= 221 && uobj.uvalue <= 240) {
      rangearray[8] = rangearray[8] + 1;
      indx = 8;
    } else if (uobj.uvalue >= 241 && uobj.uvalue <= 260) {
      rangearray[9] = rangearray[9] + 1;
      indx = 9;
    } else if (uobj.uvalue >= 261 && uobj.uvalue <= 280) {
      rangearray[10] = rangearray[10] + 1;
      indx = 10;
    } else if (uobj.uvalue >= 281 && uobj.uvalue <= 300) {
      rangearray[11] = rangearray[11] + 1;
      indx = 11;
    } else {
      indx = 100;
    }
    return indx;
  }

  let usergender; // determine pin colors
  let userindx; // user's pin location
  let u1value; // user's weight displayed with pin
  let tempindx;

  // increment range based on gender, store user's info for pin
  for (let i = 0; i < arrData.length; i++) {
    if (arrData[i].ugender == "Male") {
      tempindx = rangeIncrement(arrData[i], rangearraym);
    } else if (arrData[i].ugender == "Female") {
      tempindx = rangeIncrement(arrData[i], rangearrayf);
    }

    if (i == 0) {
      userindx = tempindx;
      usergender = arrData[i].ugender;
      u1value = arrData[i].uvalue;
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

export class WeightRangeChart extends React.Component {
  render() {
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
            source: processDataList(arrData).dataset
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
                itemStyle: { color: processDataList(arrData).pincolorm },
                data: [
                  {
                    name: "You",
                    value: processDataList(arrData).value,
                    xAxis: processDataList(arrData).index,
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
                itemStyle: { color: processDataList(arrData).pincolorf },
                data: [
                  {
                    name: "You",
                    value: processDataList(arrData).value,
                    xAxis: processDataList(arrData).index,
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
}
