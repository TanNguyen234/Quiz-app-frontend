const userReducer = (state = {}, action) => {
    console.log(state, action)

    switch (action.type) {
        case "REGISTER":
           
           break;

        case "LOGIN":
            if(action.type === "LOGIN_SUCCESS") {
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
            
            break;
        
        case "LOGOUT":
            
        break;
    
        default:
            return state;
    }
}

export default userReducer