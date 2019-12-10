import React from "react";
import { ApolloContext } from "../../apollo-context-provider";
import { gql } from "apollo-boost";
import "./user-descriptor.css";

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

const query = gql`
  query {
    getBalance
  }
`;

export class EtheriumBalanceComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      value: 0
    };
  }

  componentDidMount() {
    this.setState({ ...this.state, loading: true });
    this.context.client
      .query({ query: query })
      .then(({ data }) => {
        console.log(data);
        this.setState({
          ...this.state,
          loading: false,
          value: data.getBalance
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
    return (
      <div style={styles.container}>
        <div>
          <h1 style={styles.text}>{this.state.value.toFixed(2)} eth</h1>
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

EtheriumBalanceComponent.contextType = ApolloContext;
