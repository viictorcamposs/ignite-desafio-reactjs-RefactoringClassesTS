import { Route, Switch } from "react-router";
import { Dashboard } from "../pages/Dashboard";

export const Routes = (): JSX.Element => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
  </Switch>
);