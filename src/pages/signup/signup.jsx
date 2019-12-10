import React from "react";
import "./signup.css";
import { signup } from "../../queries";
import { token } from "../../resources/token";
import LoadingScreen from "react-loading-screen";
import { ApolloContext } from "../../apollo-context-provider";
import { Redirect } from "react-router-dom";

export class SignUpComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      loading: false,
      redirect: false
    };
  }

  submitForm(e) {
    e.preventDefault();
    const variables = {
      id: this.state.id
    };
    this.context.client
      .mutate({ mutation: signup, variables })
      .then(({ createNewAccount }) => {
        console.log(createNewAccount.newKey);
        localStorage.setItem(token, createNewAccount.newKey);
        this.setState({ ...this.state, redirect: true, loading: false });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    if (this.state.loading) {
      return (
        <LoadingScreen
          loading={true}
          bgColor="#66ccff"
          spinnerColor="#9ee5f8"
          textColor="#ffffff"
          text="Creating your personal account"
        />
      );
    } else if (this.state.redirect) {
      return <Redirect to="login"></Redirect>;
    }
    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form>
            <h1 style={{ marginLeft: "175px" }}>Sign Up</h1>
            <div
              style={{ display: "flex", flexDirection: "row" }}
              className="form-group"
            >
              <label id="privatekey">Private key</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your private key"
                onChange={e => this.setState({ id: e.target.value })}
              />
            </div>

            <button
              id="signUpButton"
              type="submit"
              className="btn btn-primary btn-block"
              onClick={e => this.submitForm(e)}
            >
              Sign Up
            </button>
            <p className="forgot-password text-right">
              Already registered <a href="/">sign in?</a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

SignUpComponent.contextType = ApolloContext;
