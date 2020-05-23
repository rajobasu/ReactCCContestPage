import React, { useState } from "react";
import {
  makeStyles,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Selector(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <FormControl required className={classes.formControl}>
        <InputLabel id="demo-simple-select-required-label">
          {props.display === undefined ? "" : props.display}
        </InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={props.selectedItem}
          onChange={props.onChange}
          className={classes.selectEmpty}
        >
          {props.items.map((language) => {
            return (
              <MenuItem key={language[props.id]} value={language[props.id]}>
                {language[props.id]}
              </MenuItem>
            );
          })}
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>
    </React.Fragment>
  );
}
