import React from "react";
import "./login.css";
import { login } from "../../queries";
import LoadingScreen from "react-loading-screen";
import Web3 from "web3";
import { ApolloContext } from "../../apollo-context-provider";
import { Redirect } from "react-router-dom";
import { token } from "../../resources/token";

/** getSM = get Signed Message. Signed Message contains the address of the user
 * encrypted into the message. This message will be sent to graphql mutation
 * verify, where the address will be obtained and returned to this page. This
 * will be processed by setContext. This is an async function, any calls to this
 * has to have async/await or use .then
 */
export async function getSM() {
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
      console.log(`Signed message: ${signedMessage}`);
      return signedMessage;
    } catch (e) {
      console.error(e);
    }
  }
}

export class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      isLoading: false,
      redirect: false
    };
  }
  async submitForm(e) {
    this.setState({ ...this.state, isLoading: true });
    e.preventDefault();
    let signedMessage = await getSM();
    const variables = {
      id: signedMessage
    };
    this.context.client
      .mutate({ mutation: login, variables })
      .then(({ data }) => {
        console.log(data);
        this.context.cb({ authorization: data.verify.address });
        localStorage.setItem(token, data.verify.address);
        this.setState({ ...this.state, isLoading: false, redirect: true });
      })
      .catch(err => console.error(err));
  }
  render() {
    if (this.state.loading) {
      return (
        <LoadingScreen
          loading={true}
          bgColor="#66ccff"
          spinnerColor="#9ee5f8"
          textColor="#ffffff"
          text="Verifying"
        />
      );
    } else if (this.state.redirect) {
      return <Redirect to="user-analytics"></Redirect>;
    }
    return (
      <div className="auth-wrapper">
        <h1 id="title">Health Analytics Engine</h1>
        <div className="auth-inner">
          <form>
            <h1 style={{ marginLeft: "200px" }}>Log In</h1>
            <button
              id="loginButton"
              type="submit"
              className="btn btn-primary btn-block"
              onClick={e => this.submitForm(e)}
            >
              Login
            </button>
            <div id="remember-me-div" className="form-group">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
                </label>
              </div>
              <p className="forgot-password text-right">
                Do not have an account? <a href="/signup">Sign up</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

LoginComponent.contextType = ApolloContext;
