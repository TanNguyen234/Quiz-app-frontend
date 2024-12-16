import { getCookie } from "../helpers/cookie";
import { auth } from "../untils/request"

export const getChatAll = async (id) => {
    var path ='chat'
    if(id) {
        path += `?id=${id}`
    }
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

export const getRoom = async (id) => {
    var path ='rooms'
    if(id) {
        path += `?id=${id}`
    }
    try {
        const rooms = await auth(path, getCookie("token"));
        if(rooms.code !== 200) {
            return []
        } else {
            return rooms.data;
        }
    } catch (error) {
        return []
    }
}