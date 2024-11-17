import { deleteCookie, setCookie } from "../helpers/cookie";
import { auth, post } from "../untils/request";

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
            setCookie("token", token, 30);
            const object = {
              type: "LOGIN",
              id: id,
              fullName: fullName,
              token: token,
              status: "LOGIN_SUCCESS",
            }
            dispatch(object);
            navigate('/')

          } else {   
            dispatch({
                type: "LOGIN",
                status: "LOGIN_FAILURE"            
            });
          }
    } catch (error) {
        dispatch({
            type: "LOGIN",
            status: "LOGIN_FAILURE",
            message: error
        });
    }
}

export const autoLogin = (token) => async (dispatch) => {
    try {
        const user = await auth("user/detail", token);

          if(user.code === 200) {     
            const { id, fullName, token } = user.data
            setCookie("token", token, 30);
            const object = {
              type: "LOGIN",
              id: id,
              fullName: fullName,
              token: token,
              status: "LOGIN_SUCCESS",
            }
            dispatch(object);
          } else {   
            dispatch({
                type: "LOGIN",
                status: "LOGIN_FAILURE"            
            });
          }
    } catch (error) {
        dispatch({
            type: "LOGIN",
            status: "LOGIN_FAILURE",
            message: error
        });  
    } 
}

export const logout = () => {
    deleteCookie("token");
    return {
        type: "LOGOUT"
    }
}