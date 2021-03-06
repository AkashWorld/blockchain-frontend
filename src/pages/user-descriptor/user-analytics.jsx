import React from "react";
import { CardComponent } from "../../utilities/card";
import { DataEntryMap } from "./data-entry-map";
import { WeightRangeChart } from "./weight-range-chart";
import { TopNavigator } from "../../utilities/top-navigator";
import { BMICardComponent } from "./bmi-card";
import { WeightChangeComponent } from "./weight-change-card";
import { EtheriumBalanceComponent } from "./etherium-card";
import { LineGraph } from "./line-graph";
import { WeightAreaChart } from "./weight-area-chart";
import { BPMChart } from "./bpm-chart";
import { WeightSuggestions } from "./weight-suggestions";

const styles = {
  /**
   * The container for the entire page
   */
  pageContainer: {
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  /**
   * Container for the inner page (not the top navigation bar)
   */
  pageBg: {
    position: "absolute",
    backgroundImage:
      "linear-gradient( 171.8deg,  rgba(238,156,167,1) 13.8%, rgba(246,204,162,1) 82.6% )",
    width: "100%",
    height: "fit-content(100%)",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    alignContent: "flex-start"
  },
  /**
   * Container that is inside the inner page, only purpose is to align the cards from left to right
   */
  cardContainer: {
    paddingTop: "50px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    maxWidth: "1600px"
  },
  /**
   * Container that stacks cards top to bottom (smaller)
   */
  cardStack: {
    display: "flex",
    flexDirection: "column"
  }
};

export class UserAnalyticsPage extends React.Component {
  render() {
    return (
      <>
        <TopNavigator page="dashboard"></TopNavigator>
        <div style={styles.pageContainer}>
          <div style={styles.pageBg}>
            <div style={styles.cardContainer}>
              <CardComponent title="Global Weight Ranges">
                <WeightRangeChart></WeightRangeChart>
              </CardComponent>
              <div style={styles.cardStack}>
                <CardComponent
                  title="Latest BMI"
                  style={{ backgroundColor: "#4ce06c" }}
                >
                  <BMICardComponent></BMICardComponent>
                </CardComponent>
                <CardComponent
                  title="Weight Change Per Week"
                  style={{ backgroundColor: "#ff5959" }}
                >
                  <WeightChangeComponent></WeightChangeComponent>
                </CardComponent>
              </div>
              <CardComponent
                title="Etherium Balance"
                style={{ backgroundColor: "#0d3766" }}
              >
                <EtheriumBalanceComponent></EtheriumBalanceComponent>
              </CardComponent>
              <CardComponent title="Weight Change Over Time">
                <LineGraph> </LineGraph>
              </CardComponent>
              <CardComponent title="Recently Visited Locations">
                <DataEntryMap></DataEntryMap>
              </CardComponent>
              <CardComponent title="Global Weight Ranges">
                <WeightAreaChart></WeightAreaChart>
              </CardComponent>
              <CardComponent title="Resting Heart Rate Measurements (bpm)">
                <BPMChart></BPMChart>
              </CardComponent>
              <CardComponent title="Weight Management Resource Suggestions">
                <WeightSuggestions></WeightSuggestions>
              </CardComponent>
            </div>
          </div>
        </div>
      </>
    );
  }
}
