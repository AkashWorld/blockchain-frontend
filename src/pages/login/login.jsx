import React from "react";
import logo from "../../logo.svg";
import "./login.css";
import Web3 from "web3";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

export class LoginComponent extends React.Component {
  async componentDidMount() {
    const client = new ApolloClient({ uri: "http://localhost:8080" });
    if (window.ethereum) {
      window.Web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();
        let accounts = window.Web3.eth.getAccounts();
        let account = accounts[0];
        var signedAddr = window.Web3.eth.sign();
      } catch {}
    }
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Implement Login in this Component</p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}
