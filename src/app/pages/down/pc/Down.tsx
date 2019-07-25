import React, { Component } from "react";
import Global from "../../../global/Global";
import "./down.scss";

// window.dataLayer = window.dataLayer || [];

class PCDown extends Component {
   
    componentDidMount() {
        // console.log(Global);

    }


    render() {
        
        return (
            <div className="pc-down">
                <div className="logo">
                    <img src={require("../../../../assets/newqibaologoe16.png")} alt="" />
                </div>

                <div className="beautiful-girl">
                    <img src={require("../../../../assets/renwu.png")} alt="" />
                </div>

                <div className="enter-game">
                    <img src={require("../../../../assets/pcanjian.png")} alt="" onClick={() => this.entryGame()} />
                </div>
                <div className="box">
                    <div className="img-box">
                        <img className="box-top" src={require("../../../../assets/icon.png")} alt="" />
                        <img className="box-bottom" src={require("../../../../assets/new_icon.24xiangziao15-2.png")} alt="" />
                    </div>
                </div>
                <div className="add-tips">关注财产安全 拒绝赌博</div>
            </div>
        );
    }
    entryGame(): void {
        let p = Global.packageName
            .split(".")
            .slice(0, 3)
            .join(".");

        window.location.href = `${window.location.protocol}//${window.location.hostname}/${p}/hall/?t=${Global.token}${btoa(
            Global.serverHost
        )}&p=${btoa(JSON.stringify(Global.params))}`;
    }
}

export default PCDown;
