import React from "react";

const styles = {
  container: {
    height: "130px",
    width: "250px",
    display: "flex",
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontSize: "60px"
  }
};

export class WeightChangeComponent extends React.Component {
  render() {
    return (
      <div style={styles.container}>
        <h1 style={styles.text}>2.4 lb ↓</h1>
      </div>
    );
  }
}
