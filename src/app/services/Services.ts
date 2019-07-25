import Axios from "axios";
import Api from "../api/Api";
import Qs from "querystring";
import Global from "../global/Global";

class Services {
    async down(params: {}) {}
    async regin(params: {}) {
        return await Axios.post(Global.serverHost + Api.regin, Qs.stringify(params));
    }

    async saveCode(params: {}) {
        return await Axios.get(Global.serverHost + Api.saveCode, { params: params });
    }
}

export default new Services();
