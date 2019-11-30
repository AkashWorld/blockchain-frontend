import React from "react";
import { Login} from "./pages/login/login";
import { HashRouter, Switch, Route } from "react-router-dom";
import { DataEntryForm } from "./pages/data-entry/data-entry";
import { UserAnalyticsPage } from "./pages/user-descriptor/user-analytics";
import { SignUpComponent } from "./pages/signup/signup";
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
                <HashRouter>
                    <Switch>
                        <Route exact path="/" component={Login} />
                        <Route path="/dashboard" component={UserAnalyticsPage} />
                    </Switch>
                </HashRouter>
            </div>
    );
    /*return (
      <HashRouter>
            <div>
                <Route path="/user-analytics" component={UserAnalyticsPage}></Route>
                <Switch>
                    <Route path="/login" component={LoginComponent} />
              <LoginComponent/>
            <Route path="/sign-up"></Route>
            <Route path="/form">
              <DataEntryForm></DataEntryForm>
            </Route>
                    <Route path="/global-analytics"></Route>
            
            <Route exact path="/">
            </Route>
          </Switch>
        </div>
      </HashRouter>
    );*/
  }
}
export default withApollo(RouterComponent)