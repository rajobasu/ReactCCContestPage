import React, { useEffect, useState } from "react";
import StickyHeadTable from "./Table";
import { getContestRanklist } from "../../APICalls/API";
import SpaceElement from "../SpaceElement/SpaceElement";

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
      <StickyHeadTable ranklist={ranklist} />
    </React.Fragment>
  );
}
