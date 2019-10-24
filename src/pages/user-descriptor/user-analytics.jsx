import React from "react";
import { CardComponent } from "../../utilities/card";
import { DataEntryMap } from "./data-entry-map";

const styles = {
  pageContainer: {
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  pageBg: {
    position: "absolute",
    backgroundImage: "linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 100%)",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    alignContent: "flex-start"
  }
};

export class UserAnalyticsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={styles.pageContainer}>
        <div style={styles.pageBg}>
          <CardComponent title="Recently Visited Locations">
            <DataEntryMap></DataEntryMap>
          </CardComponent>
        </div>
      </div>
    );
  }
}
