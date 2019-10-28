import React from "react";

const styles = {
  container: {
    height: "350px",
    width: "250px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  text: {
    color: "white",
    fontSize: "50px"
  },
  parapgraph: {
    color: "white",
    fontSize: "20px"
  }
};

export class EtheriumBalanceComponent extends React.Component {
  render() {
    return (
      <div style={styles.container}>
        <div>
          <h1 style={styles.text}>71.3 eth</h1>
        </div>
        <div>
          <p style={styles.parapgraph}>
            Learn more about etherium, cryptocurrencies and blockchain at the
            official etherium website.
          </p>
        </div>
      </div>
    );
  }
}
