import React from "react";
import { Login } from "./pages/login/login";
import { HashRouter, Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import { DataEntryForm } from "./pages/data-entry/data-entry";
import { UserAnalyticsPage } from "./pages/user-descriptor/user-analytics";
import { SignUp } from "./pages/signup/signup";
/*import { useApolloClient } from "@apollo/react-hooks";*/
import { hasLoggedIn } from "./queries";
import { withApollo } from "react-apollo";
/**
 * To learn how to use the Router: https://reacttraining.com/react-router/web/guides/quick-start

 */
export class RouterComponent extends React.Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Login} />
                        <Route path="/signup" component={SignUp} />
                        <Route path="/dashboard" component={UserAnalyticsPage} />
                    </Switch>
                </BrowserRouter>
            </div>
    );
  }
}
export default withApollo(RouterComponent)