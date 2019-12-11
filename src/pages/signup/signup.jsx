import React from "react";
import "./signup.css";
import { signup, login } from "../../queries";
import { token } from "../../resources/token";
import { getSM } from "../login/login";
import LoadingScreen from "react-loading-screen";
import { ApolloContext } from "../../apollo-context-provider";
import { Redirect } from "react-router-dom";

export class SignUpComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      loading: false,
      redirectToForm: false,
      redirectToLogin: false
    };
  }

  submitForm(e) {
    this.setState({ ...this.state, loading: true });
    e.preventDefault();
    const variables = {
      id: this.state.id
    };
    this.context.client
      .mutate({ mutation: signup, variables })
      .then(({ createNewAccount }) => {
        console.log(`Create Account: ${createNewAccount.newKey}`);
        getSM()
          .then(msg => {
            this.context.client
              .mutate({ mutation: login, variables: { id: msg } })
              .then(({ data }) => {
                console.log(data);
                this.context.cb({ authorization: data.verify.address });
                localStorage.setItem(token, data.verify.address);
                this.setState({
                  ...this.state,
                  loading: false,
                  redirectToForm: true
                });
              });
          })
          .catch(err => {
            console.log(err);
            getSM().then(msg => {
              this.context.client
                .mutate({ mutation: login, variables: { id: msg } })
                .then(({ data }) => {
                  console.log(data);
                  this.context.cb({ authorization: data.verify.address });
                  localStorage.setItem(token, data.verify.address);
                  this.setState({
                    ...this.state,
                    loading: false,
                    redirect: true
                  });
                });
            });
          });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          ...this.state,
          loading: false,
          redirectToLogin: true
        });
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
    } else if (this.state.redirectToForm) {
      return <Redirect to="form"></Redirect>;
    } else if (this.state.redirectToLogin) {
      return <Redirect to="/"></Redirect>;
    }
    return (
      <div className="auth-wrapper">
        <h1 id="title">Health Analytics Engine</h1>
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
