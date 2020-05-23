import React, { useState, useEffect } from "react";
import { isLoggedIn } from "../../APICalls/LoginHandler";
import {
  getProblemDetails,
  getSubmissionForProblem,
  getLanguages,
} from "../../APICalls/API";
import { Redirect } from "react-router-dom";
import StickyHeadTable from "./Table";
import Header from "../../components/Header";
import { Link, Grid, Typography, TextareaAutosize } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import OnlineEditor from "../../components/OnlineEditor/OnlineEditor";

export default function SpecificContestPage(props) {
  const [problemDetails, setProblemDetails] = useState(0);
  const [submissions, setSubmission] = useState(0);
  const [languages, setLanguage] = useState(0);

  function problemDetailsCallback(problemDetails) {
    console.log("Finally got called back in problem display page");
    console.log(problemDetails);
    setProblemDetails(problemDetails);
  }

  function getSubmissionsCallBack(submissions) {
    setSubmission(submissions.content);
  }

  function languageCallBack(languages) {
    setLanguage(languages.content);
  }

  useEffect(() => {
    getProblemDetails(
      problemDetailsCallback,
      props.match.params.contestCode,
      props.match.params.problemCode
    );
    getSubmissionForProblem(
      getSubmissionsCallBack,
      props.match.params.problemCode
    );
    getLanguages(languageCallBack);
  }, []);

  if (!isLoggedIn()) {
    return <Redirect to="/"></Redirect>;
  }

  if (problemDetails === 0 || submissions === 0) {
    return <h1>LOADING</h1>;
  }

  if (problemDetails === null) {
    return <h1>Error occurred, Refresh Page</h1>;
  }

  return (
    <React.Fragment>
      <Header />
      <Link href={"/contestpage/" + props.match.params.contestCode}>
        Go Back to Contest
      </Link>
      <Grid container>
        <Grid item xs={false} sm={1}></Grid>
        <Grid item xs={10}>
          <Grid container direction="column">
            <Grid item>
              <Grid container spacing={2} align-content={"space-between"}>
                <Grid item xs={12} sm={7}>
                  <Typography variant="h3">
                    {problemDetails.problemName}
                  </Typography>
                  <Typography>{problemDetails.body}</Typography>
                </Grid>
                <Grid item xs={12} sm={5}>
                  {(() => {
                    if (submissions !== undefined)
                      return <StickyHeadTable submissions={submissions} />;
                  })()}
                </Grid>
              </Grid>
            </Grid>
            {(() => {
              if (languages !== 0) {
                console.log("HERE");
                console.log(languages);
                return <OnlineEditor languages={languages} />;
              }
            })()}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
