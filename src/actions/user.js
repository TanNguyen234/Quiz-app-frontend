import { deleteCookie, setCookie } from "../helpers/cookie";
import { auth, post } from "../untils/request";

export const register =
  (fullName, email, password, navigate) => async (dispatch) => {
    try {
      
    const user = await post("user/register", { fullName, email, password });

    if (user.code === 200) {
      const { id, fullName, token } = user.data;
      setCookie("token", token, 30);

      const object = {
        type: "REGISTER",
        id: id,
        fullName: fullName,
        token: token,
        status: "REGISTER_SUCCESS",
      };

      dispatch(object);
      localStorage.setItem('register', true);
      navigate("/", {state: { register: true}});

      return {
        success: true,
      };
    } else {
      throw new Error(user.message);
    }
  } catch (error) {
    dispatch({
      type: "REGISTER",
      status: "REGISTER_FAILURE",
    });
    return {
      success: false,
      message: error
    };
  }
  };

export const login = (email, password, navigate) => async (dispatch) => {
  try {
    const user = await post("user/login", {
      email,
      password,
    });

    if (user.code === 200) {
      const { id, fullName, token } = user.data;
      setCookie("token", token, 30);
      const object = {
        type: "LOGIN",
        id: id,
        fullName: fullName,
        token: token,
        status: "LOGIN_SUCCESS",
      };
      dispatch(object);
      localStorage.setItem('login', true);
      navigate("/");
      return {
        success: true,
      };
    } else {
      throw new Error(user.message);
    } 
  } catch (error) {
    dispatch({
      type: "LOGIN",
      status: "LOGIN_FAILURE",
    });

    return {
      success: false,
      message: error.message,
    };
  }
   
};

export const autoLogin = (token) => async (dispatch) => {
  try {
    const user = await auth("user/detail", token);

    if (user.code === 200) {
      const { id, fullName, email, token } = user.data;
      const object = {
        type: "LOGIN",
        id: id,
        fullName: fullName,
        email: email,
        token: token,
        status: "LOGIN_SUCCESS",
      };
      dispatch(object);
      return {
        success: true,
        message: user.message,
      };
    } else {
      throw new Error(user.message)
    }
  } catch (error) {
    dispatch({
      type: "LOGIN",
      status: "LOGIN_FAILURE",
    });

    return {
      success: false,
      message: error.message,
    };
  }
};

export const logout = () => {
  deleteCookie('token');
  return {
    type: "LOGOUT",
  };
};