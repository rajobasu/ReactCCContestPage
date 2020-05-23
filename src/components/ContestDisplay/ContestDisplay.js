import React, { useState, useEffect } from "react";
import CustomizedTables from "./Table";
import { Redirect } from "react-router-dom";
import { getContestDetails } from "../../APICalls/API";
import { Grid } from "@material-ui/core";
import { isLoggedIn } from "../../APICalls/LoginHandler";

export default function ContestDisplay(props) {
  const contestDetails = props.contestDetails;

  if (!isLoggedIn()) {
    return <Redirect to="/"></Redirect>;
  }

  return (
    <React.Fragment>
      <h1>{contestDetails.name}</h1>
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
