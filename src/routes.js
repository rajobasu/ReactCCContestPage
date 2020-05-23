import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch, useLocation } from "react-router-dom";
import Welcome from "./Pages/Welcome";
import ContestSelectorPage from "./Pages/ContestSelectorPage";
import { isLoggedIn } from "./APICalls/LoginHandler";
import ContestDisplayPage from "./Pages/ContestDisplayPage";
import ProblemDisplayPage from "./Pages/ProblemDisplayPage";

const Routes = (props) => {
  /*
  const location = useLocation();

  function callback(loginstatus) {
    console.log("call back has been called");
    //props.setLoginStatus(loginstatus);
  }

  useEffect(() => {
    isLoggedIn(callback);
  }, [location]);*/
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route path="/contests" component={ContestSelectorPage} />
        <Route
          exact
          path="/contestpage/:contestCode"
          component={ContestDisplayPage}
        />
        <Route
          path="/contestpage/:contestCode/problems/:problemCode"
          component={ProblemDisplayPage}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
