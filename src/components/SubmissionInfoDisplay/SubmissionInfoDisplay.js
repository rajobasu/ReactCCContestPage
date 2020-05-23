import React, { useState, useEffect } from "react";
import StickyHeadTable from "./Table";
import SpaceElement from "../SpaceElement";
import { getUserDetails, getUsername } from "../../APICalls/LoginHandler";
import { getSubmission } from "../../APICalls/API";

export default function SubmissionInfoDisplay(props) {
  const [submissions, setSubmission] = useState(0);

  function ranklistCallBack(submissions) {
    console.log("THIS CALLBACK HAS BEEN CALLED");
    setSubmission(submissions.content);
  }

  function usernameCallback(username) {
    getSubmission(ranklistCallBack, props.contestCode, username);
  }

  useEffect(() => {
    usernameCallback(getUsername());
    //getUserDetails(usernameCallback);
  }, []);

  if (submissions === 0) {
    return <SpaceElement />;
  }
  if (submissions === undefined) {
    return <h1>No Submissions Found for this user</h1>;
  }

  console.log("THIS IS SUBMISSION");
  console.log(submissions);
  return (
    <React.Fragment>
      <StickyHeadTable submissions={submissions} />
    </React.Fragment>
  );
}
