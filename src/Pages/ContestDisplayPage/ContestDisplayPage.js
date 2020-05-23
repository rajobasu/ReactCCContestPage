import React, { useState, useEffect } from "react";
import { isLoggedIn } from "../../APICalls/LoginHandler";
import { getContestDetails } from "../../APICalls/API";
import { Redirect } from "react-router-dom";
import ContestDisplay from "../../components/ContestDisplay";
import Header from "../../components/Header";
import { Grid } from "@material-ui/core";
import RanklistDisplay from "../../components/RanklistDisplay/RanklistDisplay";
import SubmissionInfoDisplay from "../../components/SubmissionInfoDisplay/SubmissionInfoDisplay";

export default function ContestDisplayPage(props) {
  const [contestDetails, setContestDetails] = useState(0);

  function contestDetailsCallback(contestDetails) {
    console.log("Finally got called back");
    console.log(contestDetails);
    setContestDetails(contestDetails);
  }

  useEffect(() => {
    getContestDetails(contestDetailsCallback, props.match.params.contestCode);
  }, [props.match.params.contestCode]);
  console.log("WOWOWHY " + isLoggedIn());
  if (!isLoggedIn()) {
    console.log("WOWOWHY " + isLoggedIn());

    return <Redirect to="/"></Redirect>;
  }

  if (contestDetails === 0) {
    return <h1>LOADING</h1>;
  }

  if (contestDetails === null) {
    console.log(contestDetails);
    return <h1>This Page Does not exist</h1>;
  }

  return (
    <React.Fragment>
      <Header />
      <Grid container>
        <Grid item xs={false} sm={1} md={2}></Grid>
        <Grid item xs={12} sm={10} md={8}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <ContestDisplay contestDetails={contestDetails} />
            </Grid>
            <Grid container direction="row" spacing={2}>
              <Grid item xs={12}>
                {
                  <RanklistDisplay
                    contestCode={props.match.params.contestCode}
                  />
                }
              </Grid>
              <Grid item xs={12}>
                {
                  <SubmissionInfoDisplay
                    contestCode={props.match.params.contestCode}
                  />
                }
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={false} sm={1} md={2}></Grid>
      </Grid>
    </React.Fragment>
  );
}
