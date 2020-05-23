import React, { useState, useEffect } from "react";
import ComboBox from "./ComboBox";
import { FormControlLabel, Switch } from "@material-ui/core";

export default function ContestSelector(props) {
  const [byName, setByName] = useState(true);
  const handleChange = (event) => {
    setByName(event.target.checked);
  };

  return (
    <React.Fragment>
      <FormControlLabel
        control={
          <Switch checked={byName} onChange={handleChange} name="checkedA" />
        }
        label={byName ? "Select By Contest Name" : "Select By Contest Code"}
      />
      <ComboBox
        contestList={props.contestList}
        onSelect={props.onSelect}
        showBy={byName ? "name" : "code"}
      />
      ;
    </React.Fragment>
  );
}
