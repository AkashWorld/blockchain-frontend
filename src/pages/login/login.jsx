import React from "react";
import "./login.css";
import { useMutation } from "@apollo/react-hooks";
import { login } from "../../queries";
import "bootstrap/dist/css/bootstrap.min.css";
import { token } from "../../resources/token";
import LoadingScreen from "react-loading-screen";
import { useHistory } from "react-router-dom";
import Web3 from "web3";

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
      return signedMessage;
    } catch (e) {
      console.error(e);
    }
  }
}

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: ""
    };
  }
  async submitForm(e) {
    e.preventDefault();
    let signedMessage = await getSM();
    this.props.login({
      variables: {
        id: signedMessage
      }
    });
  }
  render() {
    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form>
            <h3>Log In</h3>
            <button
              type="submit"
              className="btn btn-primary btn-block"
              onClick={e => this.submitForm(e)}
            >
              Login
            </button>
            <div className="form-group">
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
            </div>
            <p className="forgot-password text-right">
              Do not have an account? <a href="/signup">Sign up</a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}
export function Login() {
  const history = useHistory();
  const [userLogin, { loading }] = useMutation(login, {
    onCompleted({ verify }) {
      const { address } = verify;
      localStorage.setItem(token, address);
      history.push("/dashboard");
    },
    onError({ verify }) {
      window.alert("The Account Does Not Exist");
    }
  });
  if (loading) {
    return (
      <LoadingScreen
        loading={true}
        bgColor="#66ccff"
        spinnerColor="#9ee5f8"
        textColor="#ffffff"
        text="Verifying"
      />
    );
  }
  return <LoginComponent history={history} login={userLogin} />;
}
