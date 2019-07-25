import React, { Component } from "react";
import { HashRouter, Switch, Route, Redirect, Router } from "react-router-dom";
import "./App.scss";
import Index from "./pages/index/Index";
import PCRegin from "./pages/regin/pc/Regin";
import MobileRegin from "./pages/regin/mobile/Regin";
import PCDown from "./pages/down/pc/Down";
import MobileDown from "./pages/down/mobile/Down";
import Global from "./global/Global";
import { getOs, parseString, selectServerHost, selectSourceHost, createUUID, createDownURL } from "./lib/Lib";
import Qs from "querystring";
import { Params } from "./interface/Params";

import { message } from "antd";






// import Swiper from '../../node_modules/swiper/dist/js/swiper.js'
// import '../../node_modules/swiper/dist/css/swiper.min.css'

class App extends Component<{}> {
    constructor(props: {}) {
        super(props);

        this.start();
    }

    async start() {
        message.loading("正在检测客户端...", 0);

        await new Promise((r, j) => setTimeout(() => r(), 500));

        let queryParams = Qs.parse(window.location.search.slice(1)) as any;

        let params: Params = parseString(queryParams.p) as Params;

        if (Object.keys(params).length === 0) {
            message.destroy();
            return;
        }

        // params
        Global.params = params;
        // mode
        Global.mode = params.mode;
        // 版本
        Global.appVersion = queryParams.av;
        // os
        Global.os = getOs();
        // 渠道名
        Global.packageName = queryParams.n;
        // 下载链接
        Global.appDownURL = queryParams.ad;
        // token
        Global.token = queryParams.s;
        // source hosts
        Global.sourceHosts = parseString(queryParams.sh);
        // server hosts
        Global.serverHosts = parseString(queryParams.ch);
        // source host
        Global.sourceHost = (await selectSourceHost(Global.sourceHosts)).sourceHost;
        // server host
        Global.serverHost = (await selectServerHost(Global.serverHosts)).serverHost;
        // uuid
        Global.uuid = createUUID(Math.random()) + createUUID(Math.random());
        // down url
        Global.downURL = createDownURL();

        this.router();

        message.destroy();
    }

    router() {
        if (Global.params.is_regin === 1) {
            if (Global.os === "desktop") {
                window.location.hash = "#/regin/pc";
            } else {
                window.location.hash = "#/regin/mobile";
            }
            return;
        }

        if (Global.params.is_regin === 2) {
            if (Global.os === "desktop") {
                window.location.hash = "#/down/pc";
            } else {
                window.location.hash = "#/down/mobile";
            }
            return;
        }

        if (Global.params.is_regin === 3) {
            let p = Global.packageName
                .split(".")
                .slice(0, 3)
                .join(".");

            window.location.href = `${window.location.protocol}//${window.location.hostname}/${p}/hall/?t=${Global.token}${btoa(
                Global.serverHost
            )}&p=${btoa(JSON.stringify(Global.params))}`;

            return;
        }
    }



    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/index" component={Index} exact />
                    <Route path="/down/pc" component={PCDown} exact />
                    <Route path="/down/mobile" component={MobileDown} exact />
                    <Route path="/regin/pc" component={PCRegin} exact />
                    <Route path="/regin/mobile" component={MobileRegin} exact />
                    <Redirect from="**" to="/index" />
                </Switch>
            </HashRouter>
        );
    }
}

export default App;
