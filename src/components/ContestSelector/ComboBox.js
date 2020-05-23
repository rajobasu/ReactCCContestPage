/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function ComboBox(props) {
  function handleChange(event, value, reason) {
    props.onSelect(value);

    console.log(event);
    console.log(value);
    console.log(reason);
    console.log("======");
  }

  return (
    <Autocomplete
      id="combo-box-demo"
      options={props.contestList}
      getOptionLabel={(option) => option[props.showBy]}
      onChange={handleChange}
      style={{ width: 300 }}
      autoComplete={true}
      renderInput={(params) => (
        <TextField {...params} label="Contest" variant="outlined" />
      )}
    />
  );
}
