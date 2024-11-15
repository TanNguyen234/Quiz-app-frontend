const initialState = {
    id: null,
    fullName: null,
    token: null,
    state: false,
};

const userReducer = (state = initialState, action) => {
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
                console.log('fail reducer')
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