import React from "react";
import { LoginComponent } from "./pages/login/login";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { UserAnalyticsPage } from "./pages/user-descriptor/user-analytics";
import { SignUpComponent } from "./pages/signup/signup";
import { DataEntry } from "./pages/data-entry/data-entry";
/**
 * To learn how to use the Router: https://reacttraining.com/react-router/web/guides/quick-start

 */
export class RouterComponent extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LoginComponent} />
          <Route path="/signup" component={SignUpComponent} />
          <Route path="/user-analytics" component={UserAnalyticsPage} />
          <Route path="/form" component={DataEntry} />
        </Switch>
      </BrowserRouter>
    );
  }
}
