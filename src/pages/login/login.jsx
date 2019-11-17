import React from "react";
import "./login.css";
import Web3 from "web3";
import { ApolloClient, gql } from "apollo-boost";
import { ApolloProvider, useMutation, useApolloClient} from "@apollo/react-hooks";
import { login } from '../../queries';


class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id:""
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
            }
        });
    }
  render() {
    return (
        <div>
           <form className="field" id="add" onSubmit={this.submitForm.bind(this) }>
                <div className="id">
                    <label>Password:</label>
                    <input type="password" onChange={(e) => this.setState({ id: e.target.value })} />
                </div>    
                <div className="button">
                    <button type="submit">Log in</button>
                </div>                
            </form>
      </div>
    );
  }
};
export function Login() {
    const client = useApolloClient();
    const [user_login, { data }] = useMutation(login);
    return <LoginComponent login={user_login}/>
}
