import React from "react";
import { Login } from "./pages/login/login";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { UserAnalyticsPage } from "./pages/user-descriptor/user-analytics";
import { SignUp } from "./pages/signup/signup";
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
                        <Route path="/user_info" component={DataEntryForm} />
                    </Switch>
                </BrowserRouter>
            </div>
    );
  }
}
