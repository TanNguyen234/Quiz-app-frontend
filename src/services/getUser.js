import { getCookie } from "../helpers/cookie";
import { auth } from "../untils/request"

export const getUser = async (keyword) => {
    var path = 'user'
    try {
        if(keyword) {
            path += `?keyword=${keyword}`
        }
        const users = await auth(path, getCookie("token"));
        if(users.code !== 200) {
            return []
        } else {
            return users.data;
        }
    } catch (error) {
        return []
    }
}