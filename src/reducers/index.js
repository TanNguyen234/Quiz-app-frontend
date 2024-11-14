import loginReducer from "./login";
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    loginReducer,
    //Thêm nhiều Reducer ở đây
})

export default allReducers;