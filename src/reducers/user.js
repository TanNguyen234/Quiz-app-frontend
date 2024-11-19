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