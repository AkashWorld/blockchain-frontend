import React from "react";
import { Redirect } from "react-router-dom";
import { ApolloContext } from "../apollo-context-provider";

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
  constructor(props) {
    super(props);
    this.state = {
      dashboard: false,
      dataEntry: false,
      myAccount: false
    };
    this.onDashboard = this.onDashboard.bind(this);
    this.onDataEntry = this.onDataEntry.bind(this);
    this.onAccount = this.onAccount.bind(this);
  }

  onDashboard() {
    this.setState({
      ...this.state,
      dashboard: true
    });
  }
  onDataEntry() {
    this.setState({
      ...this.state,
      dataEntry: true
    });
  }
  onAccount() {
    this.setState({
      ...this.state,
      myAccount: true
    });
    this.context.cb({});
    localStorage.clear();
  }

  render() {
    if (this.state.dashboard && this.props.page !== "dashboard") {
      return <Redirect to="user-analytics"></Redirect>;
    } else if (this.state.dataEntry && this.props.page !== "dataEntry") {
      return <Redirect to="form"></Redirect>;
    } else if (this.state.myAccount) {
      return <Redirect to="/"></Redirect>;
    }
    return (
      <div style={styles.container}>
        <button onClick={this.onDashboard} style={styles.topButton}>
          Dashboard
        </button>
        <button onClick={this.onDataEntry} style={styles.topButton}>
          Data Entry
        </button>
        <button onClick={this.onAccount} style={styles.topButton}>
          Sign Out
        </button>
      </div>
    );
  }
}

TopNavigator.contextType = ApolloContext;
