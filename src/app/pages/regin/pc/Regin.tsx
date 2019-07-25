import React, { Component } from "react";
import Captcha from "../../../lib/Captcha";
import CopyToClipboard from "react-copy-to-clipboard";
import Global from "../../../global/Global";

import "./regin.scss";
import { message } from "antd";
import { RouterProps } from "react-router";
import Services from "../../../services/Services";
import { abslength } from "../../../lib/Lib";

class PCRegin extends Component<RouterProps> {
    captchaCode = "";

    componentDidMount() {
        let captcha = new Captcha({
            fontSize: 50, //字体大小
            length: 4, //验证码长度
            height: "30px"
        });

        captcha.draw(document.querySelector("#v-code-text"), (r: any) => (this.captchaCode = r));
    }

    render() {
        return (
            <div className="pc-regin">
                <div className="top">
                    <img src={require("../../../../assets/newqibaologoe16.png")} alt="" />
                </div>

                <div className="middle">
                    <div className="title">
                        <img src={require("../../../../assets/wenzizuc.png")} alt="" />
                    </div>

                    <div className="content">
                        <div className="role-name">
                            <div className="input">
                                <div className="t">用 户 名 :</div>
                                <input type="text" className="role-name-input" />
                            </div>
                            <div className="label">由字母或数字组成的6-16个字符</div>
                        </div>

                        {/* <div className="game-nick">
                            <div className="input">
                                <div className="t">玩家昵称:</div>
                                <input type="text" className="game-nick-input" />
                            </div>

                            <div className="label">由字母或数字组成的6-16个字符</div>
                        </div> */}

                        <div className="account-pass">
                            <div className="input">
                                <div className="t">登录密码:</div>
                                <input type="text" className="account-pass-input" />
                            </div>

                            <div className="label">不能包含全角字符</div>
                        </div>

                        <div className="account-pass-repeat">
                            <div className="input">
                                <div className="t">确认密码:</div>
                                <input type="text" className="account-pass-repeat-input" />
                            </div>
                            <div className="label">不能包含全角字符</div>
                        </div>

                        <div className="v-code">
                            <div className="input">
                                <input type="text" placeholder="请输入验证码" className="v-code-input" id="v-code-input" />
                                <div id="space" />
                                <canvas width="240" height="90" id="v-code-text" />
                            </div>
                        </div>

                        <CopyToClipboard onCopy={text => this.onCopy(text)} text={Global.uuid}>
                            <div className="regin-submit regin" onClick={e => this.onClick(e)}>
                                注册
                            </div>
                        </CopyToClipboard>
                    </div>
                </div>

                <div className="bottom">
                    <img src={require("../../../../assets/new_icon.24b9ee21.png")} alt="" />
                    <div className="add-tips">关注财产安全 拒绝赌博</div>
                </div>
            </div>
        );
    }
    onClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
        // console.log(e);
    }

    async onCopy(text: string) {
        // 获取值
        // let gameNick = (document.querySelector(".game-nick-input") as HTMLInputElement).value;
        let gameNick = "VIP" + (100000 + Math.floor(Math.random() * 900000));
        let accountPass = (document.querySelector(".account-pass-input") as HTMLInputElement).value;
        let accountPassRepeat = (document.querySelector(".account-pass-repeat-input") as HTMLInputElement).value;
        let roleName = (document.querySelector(".role-name-input") as HTMLInputElement).value;
        let codeText = (document.querySelector("#v-code-input") as HTMLInputElement).value;

        if (this.captchaCode.toLocaleLowerCase() !== codeText.toLocaleLowerCase()) {
            return message.error("验证码输入错误");
        }

        if (!roleName.trim()) {
            return message.error("用户名不能为空");
        }

        if (roleName.length < 6) {
            return message.error("用户名太短,最小为6位");
        }

        if (roleName.length > 12) {
            return message.error("用户名太长,最大为12位");
        }

        if (!/^[a-zA-Z_][a-zA-Z0-9_]+$/.test(roleName)) {
            return message.error("用户名必须字母开头,且只能为数字,字母,下划线");
        }

        if (accountPass !== accountPassRepeat) {
            return message.error("两次密码输入不一致");
        }

        // if (!/^[a-zA-Z0-9_]+$/.test(gameNick)) {
        //     return message.error("昵称只能为数字,字母,下划线");
        // }

        // if (abslength(gameNick) < 4) {
        //     return message.error("昵称太短!(最多12个字符)");
        // }

        // if (abslength(gameNick) > 12) {
        //     return message.error("昵称太长!(最多12个字符)");
        // }

        if (/[^\x00-\xff]/.test(accountPass)) {
            return message.error("密码中包含非法字符");
        }

        if (accountPass.length < 6) {
            return message.error("密码太短");
        }

        if (accountPass.length > 18) {
            return message.error("密码太长");
        }

        let obj = {
            unique_id: Global.params.unique_id,
            proxy_user_id: Global.params.proxy_user_id,
            os: Global.os,
            package_name: Global.packageName,
            uuid: Global.uuid,
            account_pass: accountPass,
            game_nick: gameNick,
            role_name: roleName,
            account_name: "",
            keys: btoa(JSON.stringify({ salt: Global.uuid }))
        };

        message.loading("正在注册中...", 0);

        await new Promise((r, j) => setTimeout(() => r(), 500));

        Services.regin(obj)
            .then(async reginResponse => {
                // 通信失败
                if (!reginResponse.data) return this.error("注册异常,请稍后再试!");
                // 返回失败
                if (reginResponse.data.code !== 200) {
                    switch (reginResponse.data.code) {
                        case 531:
                            return this.error("UUID不能为空,请向上级代理索取最新链接!");
                        case 532:
                            return this.error("OS不能为空,请向上级代理索取最新链接!");
                        case 533:
                            return this.error("PACKAGE不能为空,请向上级代理索取最新链接!");
                        case 534:
                            return this.error("代理CODE不能为空,请向上级代理索取最新链接!");
                        case 535:
                            return this.error("代理等级不能为空,请向上级代理索取最新链接!");
                        case 536:
                            return this.error("昵称不能为空!");
                        case 537:
                            return this.error("密码不能为空!");
                        case 538:
                            return this.error("账号不能为空!");
                        case 5311:
                            return this.error("非法字符!");
                        case 5312:
                            return this.error("密码过长!");
                        case 5313:
                            return this.error("密码过短!");
                        case 5319:
                            return this.error("角色名包含非法字符!");
                        case 5320:
                            return this.error("角色名太长!");
                        case 5321:
                            return this.error("角色名太短!");
                        case 201:
                            return this.error("昵称包含非法字符!");
                        case 202:
                            return this.error("昵称太长!");
                        case 203:
                            return this.error("昵称太短!");
                        case 5310:
                            return this.error("昵称已被占用!");
                        case 5323:
                            return this.error("账号名已被占用!");
                        case 5322:
                            return this.error("渠道不匹配!");
                        case 5318:
                            return this.error("您只能注册一个账号!");
                        default:
                            return this.error(`账号异常! ${reginResponse.data.code}`);
                    }
                }

                obj.account_name = reginResponse.data.msg.game_user.id;

                let saveCodeResponse = await Services.saveCode(obj);

                if (saveCodeResponse.data.code !== 200) {
                    message.info(`记录失败 ${saveCodeResponse.data.code}`);
                }

                this.success(`注册成功!`);

                this.props.history.push("/down/pc");
            })
            .catch(error => {
                this.error(`网络异常,请稍后重试!`);
                console.log(error);
            });
    }

    error(error: string) {
        message.destroy();
        return message.error(error);
    }

    success(msg: string) {
        message.destroy();
        return message.success(msg);
    }
}

export default PCRegin;
