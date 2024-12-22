import { getCookie } from "../helpers/cookie";
import { postFile, post } from "../untils/request";

export const changeFile = async (FormData) => {
    const res = await postFile("user/changeInfo", FormData, getCookie("token"));
    if (res.code === 200) {
        return true;
    } else {
        return false;
    }
}

export const changeInfo = async (FormData) => {
    const res = await post("user/changeInfo", FormData, getCookie("token"));
    if (res.code === 200) {
        return true;
    } else {
        return false;
    }
}