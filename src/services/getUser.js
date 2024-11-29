import { getCookie } from "../helpers/cookie";
import { auth } from "../untils/request"

export const getUser = async (keyword) => {
    var path = 'users/not-friend'
    try {
        if(keyword) {
            path += `?keyword=${keyword}`
            console.log(path)
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

export const getRequestFriend = async (type) => {
    if(type==="request") {
        let path = 'users/requestFriend'
        try {
            const users = await auth(path, getCookie("token"));
            if(users.code !== 200) {
                return []
            } else {
                return users.data;
            }
        } catch (error) {
            return []
        }   
    } else if(type==="accept") {
        let path = 'users/acceptFriend'
        try {
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
}