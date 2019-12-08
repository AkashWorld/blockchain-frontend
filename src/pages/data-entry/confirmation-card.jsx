import React from "react";
import { ApolloContext } from "../../apollo-context-provider";
import { gql } from "apollo-boost";
import "./data-entry.css";

const SUBSCRIPTION_QUERY = gql`
  subscription {
    insertValueSubscription {
      transactionHash
      responseType
      message
    }
  }
`;

export class ConfirmationCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      status: null
    };
  }

  componentDidMount() {
    this.context.client
      .subscribe({
        query: SUBSCRIPTION_QUERY
      })
      .subscribe({
        next: payload => {
          payload = payload.data.insertValueSubscription;
          if (payload.transactionHash != this.props.txHash) {
            return;
          }
          let status;
          let message;
          status = payload.responseType;
          if (payload.responseType == "CONFIRMATION") {
            message = "Transaction Confirmed " + payload.message;
          } else if (payload.responseType == "RECIEPT") {
            message = "Transaction Confirmed";
          }
          this.setState({ status, message });
        }
      });
  }

  render() {
    let color = "#ff4747";
    if (this.state.status == "RECIEPT") {
      color = "#ffe647";
    } else if (this.state.status == "CONFIRMATION") {
      color = "#47ff8a";
    }
    return (
      <div
        style={{ backgroundColor: color }}
        className="confirmation-container"
      >
        <p>Transaction ID: {this.props.txHash}</p>
        <p>{this.state.message}</p>
      </div>
    );
  }
}

ConfirmationCard.contextType = ApolloContext;
