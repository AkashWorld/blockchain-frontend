﻿import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./signup.css";
import { ApolloClient, gql } from "apollo-boost";
import { ApolloProvider, useMutation, useApolloClient } from "@apollo/react-hooks";
import { signup, hasLoggedIn } from '../../queries';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { token } from '../../resources/token';
import LoadingScreen from 'react-loading-screen';

export class SignUpComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: ""
        };
    }
    submitForm(e) {
        e.preventDefault();
        this.props.signup({
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
                        <h3>Sign Up</h3>
                        <div className="form-group">
                            <label>Private key</label>
                            <input type="password" className="form-control" placeholder="Enter your private key"
                                onChange={(e) => this.setState({ id: e.target.value })} />
                        </div>

                        <button type="submit" className="btn btn-primary btn-block"
                            onClick={(e) => this.submitForm(e)}>Sign Up</button>
                        <p className="forgot-password text-right">
                            Already registered <a href="/">sign in?</a>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}
export function SignUp() {
    const client = useApolloClient();
    const history = useHistory();
    const [user_signup, { loading }] = useMutation(signup, {
        onCompleted({ createNewAccount }) {
            const { newKey } = createNewAccount;
            localStorage.setItem(token, newKey);
            client.writeQuery({ query: hasLoggedIn, data: { isLoggedIn: true } });
        },
    });
    if (loading) {
        return <LoadingScreen
            loading={true}
            bgColor='#66ccff'
            spinnerColor='#9ee5f8'
            textColor='#ffffff'
            text='Creating your personal account'/>  
    }
    return <SignUpComponent history={history} signup={user_signup} />
}