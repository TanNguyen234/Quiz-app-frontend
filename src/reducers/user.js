const userReducer = (state = {}, action) => {
    switch (action.type) {
        case "REGISTER":
            if(action.status === "REGISTER_SUCCESS") {
                return {
                 ...state,
                 id: action.id,
                 fullName: action.fullName,
                 token: action.token,
                 state: true,
                }
             } else {
                 return {
                     ...state,
                     state: false
                 }
             }

        case "LOGIN":
            console.log("LOGIN", action)
            if(action.status === "LOGIN_SUCCESS") {
               return {
                ...state,
                id: action.id,
                fullName: action.fullName,
                token: action.token,
                state: true,
               }
            } else {
                return {
                    ...state,
                    state: false
                }
            }
        case "AUTO_LOGIN":
            console.log("AUTO_LOGIN", action)
            if(action.status === "LOGIN_SUCCESS") {
                return {
                 ...state,
                 id: action.id,
                 fullName: action.fullName,
                 token: action.token,
                 state: true,
                }
             } else {
                 return {
                     ...state,
                     state: false
                 }
             }
        
        case "LOGOUT":
            console.log("LOGOUT", action)
            localStorage.setItem('isAuthenticated', JSON.stringify(false));
            return {
                ...state,
                state: false
            }
    
        default:
            return {
                ...state,
                state: false
            };
    }
}

export default userReducer