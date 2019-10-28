import React from "react";
import ReactEcharts from "echarts-for-react";

// Expected Object
function BossObject(Unit, Weight, Latitude, Longitude, Time, Gender) {
  this.unit = Unit;
  this.weight = Weight;
  this.latitude = Latitude;
  this.longitude = Longitude;
  this.time = Time;
  this.gender = Gender;
}

// object array
let dataArray = [];

// Generated random weight and time.
for (let i = 0; i < 100; i++) {
  let Unit = "lb";
  let Latitude = 0;
  let Longitude = 0;
  let startDate = new Date(2012, 0, 1);
  let endDate = new Date();
  let randomTime = new Date(
    startDate.getTime() +
      Math.random() * (endDate.getTime() - startDate.getTime())
  );
  let maxWeight = 350;
  let minWeight = 40;
  let Weight =
    Math.floor(Math.random() * (maxWeight - minWeight + 1)) + minWeight; // newValue is the weight in this case.

  // let date = randomTime.getDate();
  let month = randomTime.getMonth(); //Be careful! January is 0 not 1
  let year = randomTime.getFullYear();
  let randGen = Math.floor(Math.random() * 2);
  let dateString = month + 1 + "-" + year;
  let newGender = "";
  if (randGen) {
    newGender = "Male";
  } else {
    newGender = "Female";
  }

  let newWTobject = new BossObject(
    Unit,
    Weight,
    Latitude,
    Longitude,
    dateString,
    newGender
  );

  dataArray.push(newWTobject);
}

for (let i = 0; i < 100; i++) {
  console.log(dataArray[i]);
}

let sortedTimeArray = [];
for (let j = 0; j < dataArray.length; j++) {
  sortedTimeArray[j] = dataArray[j].time;
}
sortedTimeArray.sort(function(a, b) {
  a = a.split("-");
  b = b.split("-");
  return new Date(a[1], a[0], 1) - new Date(b[1], b[0], 1);
});

// dataArray.sort(compareValues('weight'));
let weightArray = [];
for (let j = 0; j < dataArray.length; j++) {
  weightArray[j] = dataArray[j].weight;
}

// temporary dataset used to populate graph
let rangeLength = 11;
let rangearraym = new Array(rangeLength);
rangearraym.fill(0);
let rangearrayf = new Array(rangeLength);
rangearrayf.fill(0);

// finding range of users weight
function weightRange(WTObj, weightRangeArray) {
  let indx;
  if (WTObj.weight >= 40 && WTObj.weight <= 50) {
    weightRangeArray[0] = weightRangeArray[0] + 1;
    indx = WTObj.weight;
  } else if (WTObj.weight >= 51 && WTObj.weight <= 100) {
    weightRangeArray[1] = weightRangeArray[1] + 1;
    indx = WTObj.weight;
  } else if (WTObj.weight >= 101 && WTObj.weight <= 150) {
    weightRangeArray[2] = weightRangeArray[2] + 1;
    indx = WTObj.weight;
  } else if (WTObj.weight >= 151 && WTObj.weight <= 200) {
    weightRangeArray[3] = weightRangeArray[3] + 1;
    indx = WTObj.weight;
  } else if (WTObj.weight >= 201 && WTObj.weight <= 300) {
    weightRangeArray[4] = weightRangeArray[4] + 1;
    indx = WTObj.weight;
  } else if (WTObj.weight >= 301) {
    weightRangeArray[5] = weightRangeArray[5] + 1;
    indx = WTObj.weight;
  } else {
    indx = 0;
  }
  return indx;
}

let usergender;
let weightIndx; // used to determine users weight index

// record user info
let weightIndex;
let userValue;
for (let i = 0; i < dataArray.length; i++) {
  if (dataArray[i].gender == "Male") {
    weightIndex = weightRange(dataArray[i], rangearraym);
  } else if (dataArray[i].gender == "Female") {
    weightIndex = weightRange(dataArray[i], rangearrayf);
  }

  if (i == 0) {
    weightIndx = weightIndex;
    usergender = dataArray[i].gender;
    userValue = dataArray[i].weight;
  }
}

// Determine visibility of pin based on gender
let pincolorm;
let pincolorf;

if (usergender == "Male") {
  pincolorm = "green";
  pincolorf = "#00000000";
} else if (usergender == "Female") {
  pincolorm = "blue";
  pincolorf = "#00000000";
}

// for (let i = 0; i < 100; i++) {console.log(timeArray[i])} // ouput sorted time in an array

export class LineGraph extends React.Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
  }

  render() {
    return (
      <ReactEcharts
        style={{ height: "350px", width: "750px" }}
        option={{
          xAxis: {
            type: "category",
            name: "Time",
            nameGap: 30,
            nameTextStyle: { fontWeight: "bold" },
            data: sortedTimeArray
          },
          title: {
            left: "center",
            text: "Weight Analytics",
            textStyle: { color: "white" }
          },
          series: [
            {
              type: "line",
              markPoint: {
                symbol: "pin",
                itemStyle: { color: pincolorm },
                data: [
                  { name: "You", value: userValue, xAxis: 0, yAxis: weightIndx }
                ]
              }
            },
            {
              type: "line",
              markPoint: {
                symbol: "pin",
                itemStyle: { color: pincolorf },
                data: [
                  { name: "You", value: userValue, xAxis: 0, yAxis: weightIndx }
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
            data: dataArray.map(function(BossObject) {
              return BossObject[0];
            })
          },
          yAxis: {
            name: "Weight",
            nameTextStyle: { fontWeight: "bold" },
            type: "value"
          },
          visualMap: {
            show: true,
            type: "piecewise",
            textStyle: {
              color: "white"
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
            color: "#495057"
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
          backgroundColor: "transparent"
        }}
      />
    );
  }
}
