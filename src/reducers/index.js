import {combineReducers} from 'redux';
import userReducer from "./user";

const allReducers = combineReducers({
    userReducer,
    //Thêm nhiều Reducer ở đây
})

export default allReducers;