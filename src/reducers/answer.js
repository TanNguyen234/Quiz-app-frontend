const answerReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_ANSWER':
            return {
                ...state,
                answers: action.data
            };
        default:
            return state;
    }
}

export default answerReducer;