import React from "react";
import { Link } from "react-router-dom";
import "./login.css";
import Web3 from "web3";
import { ApolloClient, gql } from "apollo-boost";
import { ApolloProvider, useMutation, useApolloClient } from "@apollo/react-hooks";
import { login, hasLoggedIn } from '../../queries';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { token } from '../../resources/token';
import { UserAnalyticsPage } from '../user-descriptor/user-analytics';
import LoadingScreen from 'react-loading-screen';
import { useHistory, Redirect } from "react-router-dom";

class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: ""
        };
    }
  /*async componentDidMount() {
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
    }*/
    submitForm(e) {
        e.preventDefault();
        this.props.login({
            variables: {
                id: this.state.id
            },
        });
    }
  render() {
      return (
          <div className="auth-wrapper">
              <div className="auth-inner">
                <form>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Block address</label>
                        <input type="password" className="form-control" placeholder="Enter your block address"
                        onChange={(e) => this.setState({ id: e.target.value })} />
                </div>
                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                      <button type="submit" className="btn btn-primary btn-block" onClick={(e)=>this.submitForm(e)}>Submit</button>
                      <p className="forgot-password text-right">
                          Do not have an account? <a href="/signup">Sign up</a>
                </p>
              </form>
            </div>
          </div>
        );
    }
};
export function Login() {
    const client = useApolloClient();
    const history = useHistory()
    const [user_login, { loading,data }] = useMutation(login, {
        onCompleted({ verify }) {
            const { address } = verify;
            console.log(address);
            localStorage.setItem(token, address);
            history.push("/dashboard");
        },
    });
    if (loading) {
        return <LoadingScreen
            loading={true}
            bgColor='#66ccff'
            spinnerColor='#9ee5f8'
            textColor='#ffffff'
            text='Verifying' />  
    }
    return <LoginComponent history={history} login={user_login} />
}
