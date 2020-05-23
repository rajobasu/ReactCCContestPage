import React, { useState, useEffect } from "react";
import CustomizedTables from "./Table";
import { Redirect } from "react-router-dom";
import { getContestDetails } from "../../APICalls/API";
import { Grid } from "@material-ui/core";
import { isLoggedIn } from "../../APICalls/LoginHandler";
import Timer from "../Timer/Timer";

export default function ContestDisplay(props) {
  const contestDetails = props.contestDetails;

  if (!isLoggedIn()) {
    return <Redirect to="/"></Redirect>;
  }
  console.log(contestDetails);
  let code = 0;
  let ddt = undefined;

  if (
    contestDetails.problemsList === null ||
    contestDetails.problemsList === undefined ||
    contestDetails.problemsList.length === 0
  ) {
    // future contest
  } else {
    ddt = parseInt(Date.parse(contestDetails.problemsList[0].end));
  }
  return (
    <React.Fragment>
      <h1>{contestDetails.name}</h1>

      <Timer time={ddt} />
      {(() => {
        if (contestDetails.problemsList === undefined) {
          return <h1>No problems to display</h1>;
        } else {
          return (
            <CustomizedTables
              problemList={contestDetails.problemsList}
              contestCode={contestDetails.code}
            />
          );
        }
      })()}
    </React.Fragment>
  );
}
