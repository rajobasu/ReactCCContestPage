import React, { useEffect, useState } from "react";
import StickyHeadTable from "./Table";
import { getContestRanklist } from "../../APICalls/API";
import SpaceElement from "../SpaceElement/SpaceElement";
import { Grid, Typography } from "@material-ui/core";

export default function RanklistDisplay(props) {
  const [ranklist, setRanklist] = useState(0);

  function ranklistCallBack(ranklist) {
    setRanklist(ranklist.content);
  }

  useEffect(() => {
    getContestRanklist(ranklistCallBack, props.contestCode);
  }, []);

  if (ranklist === 0) {
    return <SpaceElement />;
  }

  if (ranklist === undefined) {
    return <h1>No Ranklist to display</h1>;
  }

  return (
    <React.Fragment>
      <Grid container direction="column">
        <Grid item>
          <Typography variant="h6">Ranklist:</Typography>
        </Grid>
        <Grid item>
          <StickyHeadTable ranklist={ranklist} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
