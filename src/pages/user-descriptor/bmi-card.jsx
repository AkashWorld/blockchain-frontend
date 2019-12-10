import React from "react";
import { gql } from "apollo-boost";
import { ApolloContext } from "../../apollo-context-provider";
import "./user-descriptor.css";

const styles = {
  container: {
    height: "130px",
    width: "250px",
    display: "flex",
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontSize: "50px"
  }
};

const BMIQuery = gql`
  {
    getDailyBMI {
      value
      trend
    }
  }
`;

export class BMICardComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      value: 0,
      trend: "SAME"
    };
  }

  componentDidMount() {
    this.setState({ ...this.state, loading: true });
    this.context.client
      .query({ query: BMIQuery })
      .then(({ data }) => {
        console.log(data.getDailyBMI);
        this.setState({
          ...this.state,
          loading: false,
          value: data.getDailyBMI.value,
          trend: data.getDailyBMI.trend
        });
      })
      .catch(err => {
        this.setState({
          ...this.state,
          loading: false
        });
        console.log(err);
      });
  }

  render() {
    if (this.state.loading) {
      return (
        <div>
          <h3>Loading...</h3>
          <div className="loader"></div>
        </div>
      );
    }
    let trend = "";
    if (this.state.trend === "UP") {
      trend = "↑";
    } else if (this.state.trend === "DOWN") {
      trend = "↓";
    }
    return (
      <div style={styles.container}>
        <h1 style={styles.text}>
          {this.state.value} BMI {trend}
        </h1>
      </div>
    );
  }
}

BMICardComponent.contextType = ApolloContext;
