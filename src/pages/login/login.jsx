import React from "react";
import "./login.css";
import { useMutation } from "@apollo/react-hooks";
import { login } from "../../queries";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { token } from "../../resources/token";
import LoadingScreen from "react-loading-screen";
import { useHistory } from "react-router-dom";

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: ""
    };
  }
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
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form>
            <h3>Sign In</h3>

            <div className="form-group">
              <label>Block address</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your block address"
                onChange={e => this.setState({ id: e.target.value })}
              />
            </div>
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

            <button
              type="submit"
              className="btn btn-primary btn-block"
              onClick={e => this.submitForm(e)}
            >
              Submit
            </button>
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
      console.log(address);
      localStorage.setItem(token, address);
      history.push("/dashboard");
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
