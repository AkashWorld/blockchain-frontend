import React from "react";
import { LoginComponent } from "./pages/login/login";
import { HashRouter, Switch, Route } from "react-router-dom";
import { DataEntryForm } from "./pages/data-entry/data-entry";
import { UserAnalyticsPage } from "./pages/user-descriptor/user-analytics";
import { EtherAddrContext } from "./pages/context-container";
/**
 * To learn how to use the Router: https://reacttraining.com/react-router/web/guides/quick-start

 */
export class RouterComponent extends React.Component {
  render() {
    return (
      <HashRouter>
        <EtherAddrContext.Consumer>
          {value => (
            <div>
              <Switch>
                <Route path="/login">
                  <LoginComponent></LoginComponent>
                </Route>
                <Route path="/sign-up"></Route>
                <Route path="/form">
                  <DataEntryForm></DataEntryForm>
                </Route>
                <Route path="/global-analytics"></Route>
                <Route path="/user-analytics">
                  <UserAnalyticsPage></UserAnalyticsPage>
                </Route>
                <Route path="/">
                  <div>Try /login or another route</div>
                  <p> {value.context} </p>
                </Route>
              </Switch>
            </div>
          )}
        </EtherAddrContext.Consumer>
      </HashRouter>
    );
  }
}
