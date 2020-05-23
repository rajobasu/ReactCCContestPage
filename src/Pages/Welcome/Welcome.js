import React, { useState, useEffect } from "react";
import { Button, Link, Typography, Grid } from "@material-ui/core";
import Header from "../../components/Header";
import {
  logIn,
  isLoggedIn,
  getUserDetails,
} from "../../APICalls/LoginHandler.js";
import axios from "axios";
import SpaceElement from "../../components/SpaceElement";

export default function Welcome() {
  const [userinfo, setUserInfo] = useState({});

  function callback(userinfo) {
    setUserInfo(userinfo);
  }

  useEffect(() => {
    getUserDetails(callback);
  }, []);

  return (
    <React.Fragment>
      <Header username={userinfo.username} />
      <br />
      <Typography variant="h4" align="center">
        Welcome To Codechef Online Arena. Login To Access Contests.
      </Typography>
    </React.Fragment>
  );
}
