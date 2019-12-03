import React from "react";

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-end",
    height: "55px",
    width: "100%",
    backgroundImage:
      "linear-gradient( 69deg,  rgba(116,43,62,1) 19.1%, rgba(192,71,103,1) 90.2% )"
  },
  topButton: {
    backgroundColor: "Transparent",
    backgroundRepeat: "no-repeat",
    border: "none",
    cursor: "pointer",
    overflow: "hidden",
    outline: "none",
    marginInline: "50px",
    color: "white",
    fontSize: "18px",
    mixBlendMode: "overlay"
  }
};

export class TopNavigator extends React.Component {
  render() {
    return (
      <div style={styles.container}>
        <button style={styles.topButton}>Population</button>
        <button style={styles.topButton}>Personal</button>
        <button style={styles.topButton}>Insert</button>
        <button style={styles.topButton}>My Account</button>
      </div>
    );
  }
}
