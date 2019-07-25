import Global from "../global/Global";
import TestSpeed from "./TestSpeed";

export const getOs = () => {
    let userAgent = window.navigator.userAgent;

    let os = "";

    if (/(iPhone|iPad|iPod|iOS)/i.test(userAgent)) {
        os = "ios";
    } else if (/(Android)/i.test(userAgent)) {
        os = "android";
    } else {
        os = "desktop";
    }

    return os;
};

export function parseString(str: string) {
    try {
        return JSON.parse(decodeURIComponent(atob(str)));
    } catch (error) {
        return {};
    }
}

export async function selectSourceHost(host: string[]) {
    let sourceHost = host.map(e => e + "/checked");

    let response = await TestSpeed(sourceHost, 1);

    let select = response[0];

    return { sourceHost: select.protocol + "://" + select.host };
}

export async function selectServerHost(host: string[]) {
    let serverHost = host.map(e => e + "/test/test");

    let response = await TestSpeed(serverHost, 1);

    let select = response[0];

    return { serverHost: select.protocol + "://" + select.host };
}

export function createUUID(time: number) {
    return (Date.now() / (Math.random() * time) + Math.random() * Math.random() * Date.now()).toString(32).replace(".", "");
}

export function createDownURL(): string {
    if (Global.os === "android") {
        return `${Global.sourceHost}${Global.appDownURL}?version=${Global.appVersion}`;
    } else if (Global.os === "ios") {
        return `itms-services://?action=download-manifest&url=${Global.appDownURL}`;
    } else if (Global.os === "desktop") {
        return `${Global.sourceHost}${Global.appDownURL}?version=${Global.appVersion}`;
    }
    return "";
}

export function abslength(str: string) {
    return str.replace(/[^\x00-\xff]/gi, "**").length;
}
