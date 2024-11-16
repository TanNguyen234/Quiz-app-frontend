const userReducer = (state = {}, action) => {
    switch (action.type) {
        case "REGISTER":
           
           break;

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
            return {
                state: false
            }
    
        default:
            return state;
    }
}

export default userReducer