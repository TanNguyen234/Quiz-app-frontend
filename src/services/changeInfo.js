import { getCookie } from "../helpers/cookie";
import { patch } from "../untils/request";

export const changeInfo = async (FormData) => {
    const res = await patch("user/changeInfo", FormData, getCookie("token"));
    if (res.code === 200) {
        return true;
    } else {
        return false;
    }
}