import { getCookie } from "../helpers/cookie";
import { auth } from "../untils/request"

export const getChatAll = async () => {
    var path ='chat'
    try {
        const chats = await auth(path, getCookie("token"));
        if(chats.code !== 200) {
            return []
        } else {
            return chats.data;
        }
    } catch (error) {
        return []
    }
}