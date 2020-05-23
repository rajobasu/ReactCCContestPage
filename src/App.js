import React, { useEffect, useState } from "react";
import { isLoggedIn } from "./APICalls/LoginHandler";
import { useLocation } from "react-router-dom";
import Routes from "./routes";

export default function App() {
  return (
    <div className="App">
      <Routes />
    </div>
  );
}
