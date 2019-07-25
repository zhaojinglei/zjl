import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app/App";
import * as serviceWorker from "./serviceWorker";

import Axios from "axios";
import { message } from "antd";

//引入 element ui
// import { Button } from 'element-react';
// import 'element-theme-default';

Axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
Axios.defaults.timeout = 10000;
Axios.interceptors.response.use(response => {
    return response;
});

message.config({
    maxCount: 3
});
// ReactDOM.render(<Button type="primary">Hello</Button>, document.getElementById('root'));


ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
