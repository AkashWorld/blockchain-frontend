import React from "react";
import ReactEcharts from "echarts-for-react"; // or var ReactEcharts = require('echarts-for-react');
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import "./user-descriptor.css";

//GraphQL ----------------------------------------------------------------

const USER_BPM_QUERY = gql`
  {
    getPaginatedDescriptors(unit: "bpm", start: 0, count: 250) {
      value
    }
  }
`;

function GET_USER_BPM() {
  const { loading, error, data } = useQuery(USER_BPM_QUERY);

  let status = { isLoading: false, isError: false, isData: false };

  if (loading) {
    status.isLoading = true;
    return { status, result: "Loading..." };
  }

  if (error) {
    status.isError = true;
    return { status, result: `Error! ${error.message}` };
  }

  if (
    Array.isArray(data.getPaginatedDescriptors) &&
    data.getPaginatedDescriptors.length > 0
  ) {
    status.isData = true;
    return { status, result: data.getPaginatedDescriptors };
  }

  status.isError = true;
  return { status, result: `Could not retrieve data` };
}
//------------------------------------------------------------------------------

function rangeIncrement(value, rangeArray) {
  if (value >= 50 && value <= 59) {
    rangeArray[0] = rangeArray[0] + 1;
  } else if (value >= 60 && value <= 69) {
    rangeArray[1] = rangeArray[1] + 1;
  } else if (value >= 70 && value <= 80) {
    rangeArray[2] = rangeArray[2] + 1;
  } else if (value >= 81 && value <= 90) {
    rangeArray[3] = rangeArray[3] + 1;
  } else if (value >= 91 && value <= 100) {
    rangeArray[4] = rangeArray[4] + 1;
  } else if (value >= 100) {
    rangeArray[5] = rangeArray[5] + 1;
  }
}

function processDataList(arrData) {
  // Range array to built dataset
  let rangeLength = 6;
  let rangeArray = new Array(rangeLength);
  rangeArray.fill(0);

  // increment range based on gender
  for (let i = 0; i < arrData.length; i++) {
    rangeIncrement(arrData[i].value, rangeArray);
  }

  return {
    dataset: rangeArray
  };
}

// -------------------------------------------------------------------------
export function BPMChart() {
  let bpmUserResult = GET_USER_BPM();

  if (bpmUserResult.status.isLoading)
    return (
      <div>
        <h3>Loading...</h3>
        <div className="loader"></div>
      </div>
    );

  if (bpmUserResult.status.isError)
    return (
      <div>
        <h3>Something went wrong</h3>
      </div>
    );
  else if (bpmUserResult.status.isData)
    return (
      <ReactEcharts
        style={{ height: "425px", width: "825px" }}
        option={{
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          toolbox: {
            feature: {
              saveAsImage: { title: "\n\nSave" }
            }
          },
          legend: {
            orient: "vertical",
            x: "left",
            data: ["Excellent", "Average", "Above Average", "Poor"]
          },
          series: [
            {
              name: "Ranges (BPM)",
              type: "pie",
              selectedMode: "single",
              radius: [0, "35%"],

              label: { show: true, position: "auto", color: "black" },

              labelLine: {
                normal: {
                  show: true
                }
              },
              data: [
                {
                  value: processDataList(bpmUserResult.result).dataset[0],
                  name: "50-59",
                  selected: false,
                  itemStyle: { color: "#52dfff" }
                },
                {
                  value: processDataList(bpmUserResult.result).dataset[1],
                  name: "60-69",
                  selected: false,
                  itemStyle: { color: "#52ffc8" }
                },
                {
                  value: processDataList(bpmUserResult.result).dataset[2],
                  name: "70-80",
                  selected: false,
                  itemStyle: { color: "#5eff52" }
                },
                {
                  value: processDataList(bpmUserResult.result).dataset[3],
                  name: "81-90",
                  selected: false,
                  itemStyle: { color: "#fcff52" }
                },
                {
                  value: processDataList(bpmUserResult.result).dataset[4],
                  name: "91-100",
                  selected: false,
                  itemStyle: { color: "#ffc852" }
                },
                {
                  value: processDataList(bpmUserResult.result).dataset[5],
                  name: "100+",
                  selected: false,
                  itemStyle: { color: "#ff6352" }
                }
              ]
            },
            {
              name: "BPM Zone",
              type: "pie",
              radius: ["70%", "80%"],
              label: {
                normal: {
                  formatter: "{a|{a}}{abg|}\n  {b|{b}：}{c}  {per|{d}%}  ",
                  backgroundColor: "#fff7f7",
                  borderWidth: 1,
                  borderRadius: 4,
                  rich: {
                    a: {
                      color: "#424141",
                      lineHeight: 22,
                      align: "center"
                    },
                    hr: {
                      borderColor: "#424141",
                      width: "100%",
                      borderWidth: 0.5,
                      height: 0
                    },
                    b: {
                      fontSize: 16,
                      lineHeight: 33
                    },
                    per: {
                      color: "#eee",
                      backgroundColor: "#334455",
                      padding: [2, 4],
                      borderRadius: 2
                    }
                  }
                }
              },
              data: [
                {
                  value: processDataList(bpmUserResult.result).dataset[0],
                  name: "Excellent",
                  itemStyle: { color: "#52ffc8" }
                },
                {
                  value:
                    processDataList(bpmUserResult.result).dataset[1] +
                    processDataList(bpmUserResult.result).dataset[2],
                  name: "Average",
                  itemStyle: { color: "#5eff52" }
                },
                {
                  value:
                    processDataList(bpmUserResult.result).dataset[3] +
                    processDataList(bpmUserResult.result).dataset[4],
                  name: "Above Average",
                  itemStyle: { color: "#ffc852" }
                },
                {
                  value: processDataList(bpmUserResult.result).dataset[5],
                  name: "Poor",
                  itemStyle: { color: "#ff6352" }
                }
              ]
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
