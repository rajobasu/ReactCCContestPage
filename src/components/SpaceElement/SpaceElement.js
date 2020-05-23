import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  spaceele: {
    flexGrow: 1,
  },
}));

export default function SpaceElement() {
  const classes = useStyles();
  return <div className={classes.spaceele}></div>;
}
