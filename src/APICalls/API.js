import axios from "axios";
import { logoutUser } from "./LoginHandler";
const backendURL = "http://localhost:8080/api";

/**
 * This is just used to check whether the user is still logged in properly or not.
 * If its not, then dont make a second callback.
 */
export function isValid(data) {
  return data.data.loginError === undefined;
}

export function getContestList(callback) {
  axios
    .get(backendURL + "/contestlist", { withCredentials: true })
    .then((response) => {
      console.log("CHECK THIS: " + isValid(response));
      if (!isValid(response)) logoutUser();
      callback(response.data);
    })
    .catch((Error) => console.log(Error));
}

export function getContestDetails(callback, contestCode) {
  axios
    .get(backendURL + "/contestpage/" + contestCode, { withCredentials: true })
    .then((response) => {
      if (!isValid(response)) logoutUser();
      callback(response.data);
    })
    .catch((Error) => console.log(Error));
}
export function getProblemDetails(callback, contestCode, problemCode) {
  const actualURL =
    backendURL + "/contestpage/" + contestCode + "/problems/" + problemCode;
  console.log(actualURL);
  axios
    .get(actualURL, { withCredentials: true })
    .then((response) => {
      if (!isValid(response)) logoutUser();
      callback(response.data);
    })
    .catch((Error) => console.log(Error));
}

export function getContestRanklist(callback, contestCode) {
  axios
    .get(backendURL + "/ranklist/" + contestCode, { withCredentials: true })
    .then((response) => {
      if (!isValid(response)) logoutUser();
      callback(response.data);
    })
    .catch((Error) => console.log(Error));
}

export function getSubmission(callback, contestCode, username) {
  const actualURL =
    backendURL + "/submissions/" + contestCode + "/user/" + username;
  console.log(actualURL);
  axios
    .get(actualURL, {
      withCredentials: true,
    })
    .then((response) => {
      if (!isValid(response)) logoutUser();
      console.log(response.data);
      callback(response.data);
    })
    .catch((Error) => console.log(Error));
}

export function getSubmissionForProblem(callback, problemCode) {
  const actualURL = backendURL + "/submissions/" + problemCode;
  console.log(actualURL);
  axios
    .get(actualURL, {
      withCredentials: true,
    })
    .then((response) => {
      if (!isValid(response)) logoutUser();
      console.log(response.data);
      callback(response.data);
    })
    .catch((Error) => console.log(Error));
}

export function getLanguages(callback) {
  const actualURL = backendURL + "/languages";
  console.log(actualURL);
  axios
    .get(actualURL, {
      withCredentials: true,
    })
    .then((response) => {
      if (!isValid(response)) logoutUser();
      console.log(response.data);
      callback(response.data);
    })
    .catch((Error) => console.log(Error));
}

export function submitCode(callback, src, tc, lng) {
  const actualURL = backendURL + "/submit";

  const params = new URLSearchParams();
  params.append("sourceCode", src);
  params.append("testCase", tc);
  params.append("language", lng);

  axios({
    method: "post",
    url: actualURL,
    data: params,
    withCredentials: true,
  })
    .then((response) => {
      if (!isValid(response)) logoutUser();
      console.log(response.data);
      callback(response.data.link);
    })
    .catch((Error) => console.log(Error));
  return;
}

export function getProblemStatus(callback, link) {
  const actualURL = backendURL + "/getsubmitstatus/" + link;

  console.log(actualURL);
  axios
    .get(actualURL, {
      withCredentials: true,
    })
    .then((response) => {
      if (!isValid(response)) logoutUser();
      console.log(response.data);
      callback(response.data);
    })
    .catch((Error) => console.log(Error));
}
