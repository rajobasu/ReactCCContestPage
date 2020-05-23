import React, { useState, useEffect } from "react";
import { logIn, isLoggedIn } from "../../APICalls/LoginHandler.js";
import { getContestList } from "../../APICalls/API";
import { Button, Link } from "@material-ui/core";
import Header from "../../components/Header";
import ContestSelector from "../../components/ContestSelector";
import { Redirect } from "react-router-dom";
import Selector from "./../../components/Selector";

export default function ContestPage(props) {
  const [contestList, setContestList] = useState([]);
  const [selectedContest, setSelectedContest] = useState("");
  const [contestType, setContestType] = useState("past");

  function contestListCallback(contestlist) {
    console.log("Finally got called back");
    console.log(contestlist);
    setContestList(contestlist.contestList);
  }

  function handleContestSelectionEvent(contest) {
    setSelectedContest(contest.code);
  }

  useEffect(() => {
    getContestList(contestListCallback, contestType);
  }, [contestType]);

  function contestTypeCallBack(event) {
    setContestType(event.target.value);
  }

  console.log("HREHRER: " + isLoggedIn());

  if (!isLoggedIn()) {
    return <Redirect to={"/"}></Redirect>;
  }

  if (selectedContest !== "") {
    return <Redirect to={"/contestpage/" + selectedContest}></Redirect>;
  }

  return (
    <React.Fragment>
      <Header />
      <Selector
        items={[{ name: "past" }, { name: "present" }, { name: "future" }]}
        selectedItem={contestType}
        id="name"
        display="Type"
        onChange={contestTypeCallBack}
      />
      <br></br>
      <ContestSelector
        contestList={contestList}
        onSelect={handleContestSelectionEvent}
      />
    </React.Fragment>
  );
}
