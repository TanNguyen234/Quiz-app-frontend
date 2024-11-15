import { setCookie } from "../helpers/cookie";
import { post } from "../untils/request";

export const register = (fullName, email, password) => {
    console.log(fullName, email, password)
    return {
        type: "REGISTER",
        fullName: fullName,
        email: email,
        password: password
    }
}

export const login = (email, password, navigate) => async (dispatch) => {
    try {
        const user = await post("user/login", {
            email,
            password
          });

          if(user.code === 200) {     
            const { id, fullName, token } = user.data
            setCookie("token", token);
            const object = {
              id: id,
              fullName: fullName,
              token: token,
              type: "LOGIN_SUCCESS",
            }
            dispatch(object);
            navigate('/')

          } else {   
            dispatch({
                type: "LOGIN_FAILURE"            
            });
          }
    } catch (error) {
        dispatch({
            type: "LOGIN_FAILURE",
            message: error
        });
    }
}

export const autoLogin = (status) => {
    console.log(status)
    return {
        type: "AUTO_LOGIN",
        status: status
    }
}

export const logout = () => {
    console.log("Logged out")
    return {
        type: "LOGOUT"
    }
}