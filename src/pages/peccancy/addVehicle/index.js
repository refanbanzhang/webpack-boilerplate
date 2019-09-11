import React, { Component } from "react";
import ReactDOM from "react-dom";

import { addVehicle } from "@/api";
import { fixIos12WeixinInputBug, redirect } from "@/util";

import "weui";
import "@/assets/css/common.scss";
import "./index.css";

function App() {
  return (
    <div>
      <h1>addVehicle</h1>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
