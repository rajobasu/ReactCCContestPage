import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";

export default function Timer(props) {
  function getCurrentTime() {
    return parseInt(Date.parse(new Date()));
  }
  function timeToString(convertTime) {
    let ts = "";
    const d = Math.floor(convertTime / (1000 * 60 * 60 * 24));
    convertTime = convertTime % (1000 * 60 * 60 * 24);
    const h = Math.floor(convertTime / (1000 * 60 * 60));
    convertTime = convertTime % (1000 * 60 * 60);
    const m = Math.floor(convertTime / (1000 * 60));
    convertTime = convertTime % (1000 * 60);

    const s = Math.floor(convertTime / 1000);
    if (d !== 0) {
      ts += d + " Days, ";
    }
    if (h !== 0) {
      ts += h + " Hours, ";
    }
    if (m !== 0 || (m === 0 && (d !== 0 || h !== 0))) {
      ts += m + " Mins, ";
    }
    ts += s + " Seconds";
    return ts;
  }
  const [time, setTime] = useState(getCurrentTime());
  const [interv, setInterv] = useState(
    setInterval(() => {
      setTime(getCurrentTime());
    }, 1000)
  );

  return (
    <React.Fragment>
      {(() => {
        if (props.time === undefined) {
          return <Typography variant="h5">YET TO BEGIN</Typography>;
        } else if (props.time < time) {
          return <Typography variant="h5">Contest Ended</Typography>;
        } else {
          const convertTime = props.time - time;
          return (
            <Typography variant="h5">
              Time left : {timeToString(convertTime)}
            </Typography>
          );
        }
      })()}
    </React.Fragment>
  );
}
