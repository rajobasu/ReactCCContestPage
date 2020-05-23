import React, { useState, useEffect } from "react";
import { Button, Link } from "@material-ui/core";
import Header from "../../components/Header";
import {
  logIn,
  isLoggedIn,
  getUserDetails,
} from "../../APICalls/LoginHandler.js";
import axios from "axios";

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
    </React.Fragment>
  );
}
