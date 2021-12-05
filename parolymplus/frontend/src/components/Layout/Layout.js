import React, { useState, useCallback, useEffect } from "react";
import { Container } from "semantic-ui-react";
import { Route, useHistory, Switch } from "react-router-dom";

import "./Layout.css";

import Nav from "../Nav/Nav";
import Trainer from "../../containers/Trainer/Trainer";
import YourTeam from "../../containers/YourTeam/YourTeam";
import AddMember from "../../containers/AddMember/AddMember";
import MemberSuccess from "../../containers/AddMember/MemberSuccess/MemberSuccess";
import Authenticate from "../../containers/Authenticate/Authenticate";
import YourAccount from "../../containers/YourAccount/YourAccount";
import AccountUpdate from "../../containers/YourAccount/AccountUpdate/AccountUpdate";
import AuthContext from "../../context/auth-context";

let logoutTimer;

const Layout = (props) => {

  const [token, setToken] = useState(false);
  const [trainerId, setTrainerId] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  const history = useHistory();

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setTrainerId(uid);
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "trainerData",
      JSON.stringify({
        trainerId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString()
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setTrainerId(null);
    localStorage.removeItem("trainerData");
    history.push("/");
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("trainerData"));
    if ( storedData && storedData.token && new Date(storedData.expiration) > new Date() ) {
      login(storedData.userId, storedData.token, new Date(storedData.expiration));
    }
  }, [login]);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact component={Trainer} />
        <Route path="/team/:uid" component={YourTeam} />
        <Route path="/add-member" component={AddMember} />
        <Route path="/member-success" component={MemberSuccess} />
        <Route path="/trainers/:uid" component={YourAccount} />
        <Route path="/update-account" component={AccountUpdate} />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact component={Trainer} />
        <Route path="/authenticate" component={Authenticate} />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value = {{
        isLoggedIn: !!token,
        token: token,
        trainerId: trainerId,
        login: login,
        logout: logout
      }}
    >
      <Container>
        <Nav />
        {routes}
      </Container>
    </AuthContext.Provider>
  );
};

export default Layout;
