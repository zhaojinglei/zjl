import React, { Component } from "react";

import "./down.scss";
import Global from "../../../global/Global";
import CopyToClipboard from "react-copy-to-clipboard";
import Services from "../../../services/Services";
import { message } from "antd";

import { Carousel } from 'element-react';
import 'element-theme-default';
// import gtag from '../../../gtap'
import ReactDOM from "react-dom";


// import Swiper  from "../../../../../node_modules/swiper/dist/js/swiper.js"
// import "../../../../../node_modules/swiper/dist/css/swiper.min.css"


class MobileDown extends Component {
 

  
    componentDidMount() {
     
        
     
    }
    // function gtag() { dataLayer.push(arguments); }
    // handleClick(){
    //     gtag('js', new Date());
    //     gtag('config', 'UA-143323597-3');
    //     console.log(gtag);
        
    // }

  
    
    render() {
        let a = [require('../../../../assets/轮播图/p1.jpg'),require('../../../../assets/轮播图/p2.jpg'),require('../../../../assets/轮播图/p3.jpg'),require('../../../../assets/轮播图/p4.jpg'),require('../../../../assets/轮播图/p5.jpg'),require('../../../../assets/轮播图/p6.jpg'),require('../../../../assets/轮播图/p7.jpg')];
        
        return (
            <div className="mobile-down" id='asd'>
                
                <div className="top">
                    <img src={require("../../../../assets/new_icon.baijiale15.png")} alt="" />
                </div>

                <div className="middle">
                    <div className="box">
                        <img className="t1" src={require("../../../../assets/new_icon.2icon.png")} alt="" />
                        <img className="t2" src={require("../../../../assets/new_icon.24xiangziao15-2.png")} alt="" />
                    </div>
                    
                    <div className="title">
                        <img src={require("../../../../assets/guanggaozi-2.png")} alt="" />
                    </div>

                    <div className="down">
                        <CopyToClipboard onCopy={text => this.onCopyAndroid(text)} text={Global.uuid}>
                            <div className="down-submit" >
                                <img
                                    className="down-app"
                                    src={require("../../../../assets/new_icon.24dqanzuoanjianao15.png")}
                                    alt=""
                                    onClick={e => this.onClick(e)}
                                />
                            </div>
                        </CopyToClipboard>
                        <CopyToClipboard onCopy={text => this.onCopyIos(text)} text={Global.uuid}>
                            <div className="down-submit" >

                                <img
                                    className="down-app"
                                    src={require("../../../../assets/new_icon.24pingguoanjian15.png")}
                                    alt=""
                                    onClick={e => this.onClick(e)}

                                />
                            </div>
                        </CopyToClipboard>
                    </div>
                </div>

                <div className="bottom">
                    <img src={require("../../../../assets/new_icon.24logo15.png")} alt="" />
                </div>

                <div className="add-tips">关注财产安全 拒绝赌博</div>
                <div  className="demo-1 small" id='car-botton'>
                    <div className="block" id='car-block'>
                        {/* <span className="demonstration">Click 指示器触发</span> */}
                        <Carousel trigger="click" height="150px">
                            {
                               a.map((item, index) => {
                                    return (
                                        <Carousel.Item key={index} className='car'>
                                            <img src={item} alt="" id='carimg'/>
                                        </Carousel.Item>
                                    )
                                })
                            }
                        </Carousel>
                    </div>
                </div>
            </div>

        )
    }

    onCopyIos(text: string): void {
        this.onCopy(text);
    }

    onCopyAndroid(text: string): void {
        this.onCopy(text);
    }

    async onCopy(text: string) {
        // LOADING
        message.loading("正在请求下载链接...", 0);

        await new Promise((r, j) => setTimeout(() => r(), 500));

        // 自动注册链接
        if (Global.params.is_regin === 1) {
            message.destroy();
            return this.openLink();
        }

        let obj = {
            unique_id: Global.params.unique_id,
            proxy_user_id: Global.params.proxy_user_id,
            os: Global.os,
            package_name: Global.packageName,
            uuid: Global.uuid,
            account_pass: "",
            account_name: "",
            keys: btoa(JSON.stringify({ salt: Global.uuid }))
        };

        let saveCodeResponse = await Services.saveCode(obj);

        message.destroy();

        if (saveCodeResponse.data.code !== 200) {
            message.info("链接已过期,请刷新页面下载");
        }

        return this.openLink();
    }

    openLink() {
        window.location.href = Global.downURL;
    }

    onClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void { }
}

export default MobileDown;
