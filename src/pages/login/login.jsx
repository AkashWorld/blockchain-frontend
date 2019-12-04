import React from "react";
import logo from "../../logo.svg";
import "./login.css";
import Web3 from "web3";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

/** getSM = get Signed Message. Signed Message contains the address of the user
 * encrypted into the message. This message will be sent to graphql mutation
 * verify, where the address will be obtained and returned to this page. This
 * will be processed by setContext. This is an async function, any calls to this
 * has to have async/await or use .then
 */
async function getSM() {
  if (window.ethereum) {
    window.Web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.enable();
      let accounts = await window.Web3.eth.getAccounts();
      let account = accounts[0];
      let signedMessage = await window.Web3.eth.personal.sign(
        "Auth",
        account,
        "password"
      );
      console.log(signedMessage);
      await getEtherAddress(signedMessage);
    } catch (e) {
      console.error(e);
    }
  }
}

/**BLOCK FOR QUERY AND SETTING CONTEXT VAR:
 *   getEtherAddress which is the function that acutally calls
 * the backend server from one of these components.
 *
 *   setContext will set the recieved address from getAddress to global context
 * variable, so that it can be used for other things.
 */

/**will call backend graphql server with fetch and obtain address if it exists*/
async function getEtherAddress(signedMessage) {
  /* string template that will be the query body*/
  let mut = `
    mutation {
      verify(signedMessage:"${signedMessage}"){
        address
      }
    }`;

  let mutation = mut.valueOf(); /**makes things work*/

  /**gets the data from the backend*/
  let fetcheddata = await fetch("http://localhost:8080/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: mutation,
      variables: {},
      operationName: null
    })
  })
    .then(r => r.json())
    .then(data => {
      return data;
    });

  /**func call to set context*/
  setContext(fetcheddata.data.verify.address);
}

function setContext(userAddress) {}
/**end of query block and set context block */

class ShowSignComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sign: props.sign };
    this.handleclick = this.handleclick.bind(this);
  }

  async handleclick() {
    await getSM();
  }

  render() {
    //this.setState({sign:"hell"});
    return <button onClick={this.handleclick}>{this.state.sign}</button>;
  }
}

export class LoginComponent extends React.Component {
  render() {
    return (
      <div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Implement Login in this Component</p>
          <a
            className="App-link"
            href="http://localhost:3000/#/login"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn react
          </a>
          <ShowSignComponent sign="Verify" />
        </header>
      </div>
    );
  }
}
