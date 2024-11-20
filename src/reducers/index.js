import {combineReducers} from 'redux';
import userReducer from "./user";
import answerReducer from './answer';

const allReducers = combineReducers({
    userReducer,
    answerReducer,
    //Thêm nhiều Reducer ở đây
})

export default allReducers;