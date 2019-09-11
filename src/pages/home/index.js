import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Toast, WhiteSpace, WingBlank, Button } from 'antd-mobile';

import { getVehicleList, delVehicleById } from "@/api";
import { getVehicleTypeAsText } from "@/util";
import BackHome from '@/components/BackHome'

import 'antd-mobile/dist/antd-mobile.css';
import "weui";
import "@/assets/css/common.scss";
import "./index.css";

function loadingToast() {
  Toast.loading('Loading...', 2, () => {
    console.log('Load complete !!!');
  });
}

function App() {
  return (
    <div>
      <h1>home</h1>
      <Button onClick={loadingToast}>Start</Button>
      <BackHome />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
