import React, { useState, useEffect } from "react";
import {
  Grid,
  TextareaAutosize,
  makeStyles,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  FormHelperText,
  Typography,
  Button,
} from "@material-ui/core";
import Selector from "./../Selector";
import LanguageSelector from "./LanguageSelector";
import { submitCode, getProblemStatus } from "./../../APICalls/API";
import createPalette from "@material-ui/core/styles/createPalette";
/*
 #include <iostream>
 using namespace std;
 int main(cout<<"hih" <<endl;return 0;}
*/
const useStyles = makeStyles((theme) => ({
  textField: {
    width: "500px",
  },
}));

export default function OnlineEditor(props) {
  const classes = useStyles();
  const [submitLink, setSubmitLink] = useState("");
  const [values, setValues] = useState({
    sourceCode: "",
    testCase: "",
    languageSelected: props.languages[0].shortName,
    output: "",
    status: "None Submitted",
    cmpinfo: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  function getStatus(status) {
    //console.log("THIS IS THE STATUS");
    //return;
    console.log(status);
    console.log(submitLink);

    if (status === null) {
      return;
    }
    if (status.memory === 0) {
      getProblemStatus(getStatus, submitLink);
    } else {
      setValues({
        ...values,
        status: "Evaluated",
        output: status.output,
        cmpinfo: status.cmpinfo,
      });
    }
  }

  useEffect(() => {
    if (submitLink !== "") getProblemStatus(getStatus, submitLink);
  }, [submitLink]);

  function runProblemCallBack(data) {
    setValues({ ...values, status: "submitted" });
    console.log(data);
    setSubmitLink(data);
    //console.log("SUBMITLINK:" + submitLink);
  }
  function runProblem() {
    if (values.sourceCode === "") {
      setValues({ ...values, status: "Cannot Submit Empty Code" });
      return;
    }
    submitCode(
      runProblemCallBack,
      values.sourceCode,
      values.testCase,
      values.languageSelected
    );
  }

  return (
    <React.Fragment>
      <Grid container direction="column">
        <Grid item></Grid>
        <Grid item xs={8}>
          <br />
          <h2>Problem Testing</h2>
        </Grid>
        <Grid item>
          <Selector
            items={props.languages}
            selectedItem={values.languageSelected}
            id="shortName"
            onChange={handleChange("languageSelected")}
            display="Land"
          />
        </Grid>
        <Grid container>
          <Grid item>
            <Grid container direction="column">
              <Grid item>
                <h5>Source Code</h5>
              </Grid>
              <Grid item>
                <TextareaAutosize
                  className={classes.textField}
                  onChange={handleChange("sourceCode")}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="column">
              <Grid item>
                <h5>Test Case</h5>
              </Grid>
              <Grid item>
                <TextareaAutosize
                  className={classes.textField}
                  onChange={handleChange("testCase")}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Button color="inherit" onClick={runProblem}>
          Submit
        </Button>
        <h5>Status: {values.status}</h5>

        <Typography>{values.output}</Typography>
        <Typography
          className={{ flexGrow: 1 }}
          rows={7}
          //value={values.cmpinfo}
        >
          {values.cmpinfo}
        </Typography>
      </Grid>
    </React.Fragment>
  );
}
