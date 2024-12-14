import { getCookie } from "../helpers/cookie";
import { auth } from "../untils/request"

export const logoutService = async () => {
    const path = `user/logout`;
    try {
        await auth(path, getCookie("token"));
    } catch (error) {
        return []
    }  
}