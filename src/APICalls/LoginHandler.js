import axios from "axios";
import { isValid } from "./API";

const backendURL = "http://localhost:8080/api";

let userinfo = {};

export async function logoutUser() {
  console.log("LOGOUT CALLED");
  sessionStorage.setItem("LoggedIn", "false");
  axios
    .get(backendURL + "/logout", { withCredentials: true })
    .then((response) => {
      userinfo = {};
      console.log(response);
    });
}

export function getUserDetails(callback) {
  if (isLoggedIn()) {
    callback(userinfo);
    return;
  }
  console.log("OOF");
  axios
    .get(backendURL + "/userinfo", { withCredentials: true })
    .then((response) => {
      if (!isValid(response)) logoutUser();
      else {
        sessionStorage.setItem("LoggedIn", "true");
        userinfo = response.data;
        console.log("MADE A SUCCESSFUL LOGIN");
      }

      callback(userinfo);
    });
}

export function getUsername() {
  if (isLoggedIn()) return userinfo.username;
  else return "";
}

export function isLoggedIn() {
  console.log(sessionStorage.getItem("LoggedIn"));
  return sessionStorage.getItem("LoggedIn") === "true";

  // axios
  //   .get(backendURL + "/loggedinstatus", { withCredentials: true })
  //   .then((promise) => {
  //     console.log(promise);
  //     if (promise.data === "x") callback(1);
  //     else callback(2);
  //   })
  //   .catch((Error) => {
  //     console.log(Error);
  //   });
  // //return loggedInStatus;
}
