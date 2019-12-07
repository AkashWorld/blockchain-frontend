import React from "react";
import { LoginComponent } from "./pages/login/login";
import { HashRouter, Switch, Route } from "react-router-dom";
import { DataEntry } from "./pages/data-entry/data-entry";
import { UserAnalyticsPage } from "./pages/user-descriptor/user-analytics";
/**
 * To learn how to use the Router: https://reacttraining.com/react-router/web/guides/quick-start

 */
export class RouterComponent extends React.Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/login">
            <LoginComponent></LoginComponent>
          </Route>
          <Route path="/sign-up"></Route>
          <Route path="/form">
            <DataEntry></DataEntry>
          </Route>
          <Route path="/global-analytics"></Route>
          <Route path="/user-analytics">
            <UserAnalyticsPage></UserAnalyticsPage>
          </Route>
          <Route path="/">
            <div>Try /login or another route</div>
          </Route>
        </Switch>
      </HashRouter>
    );
  }
}
