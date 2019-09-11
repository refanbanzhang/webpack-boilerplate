import React, { Component } from "react";
import ReactDOM from "react-dom";

import { getVehicleList, delVehicleById } from "@/api";
import { getVehicleTypeAsText } from "@/util";

import "weui";
import "@/assets/css/common.scss";
import "./index.css";

function App() {
  return (
    <div>
      <h1>home</h1>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
