import { Params } from "../interface/Params";

class Global {
    // mode
    mode = "";

    // os
    os = "";

    // app version
    appVersion = "";

    // package name
    packageName = "";

    appDownURL = "";

    token = "";

    sourceHosts: string[] = [];

    serverHosts: string[] = [];

    sourceHost = "";

    serverHost = "";

    uuid = "";

    downURL = "";


    params: Params = {} as Params;
}

export default new Global();
