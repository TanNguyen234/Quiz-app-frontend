const answerReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_ANSWER':
            return {
                ...state,
                answers: action.data
            };
        case 'GET_ANSWER_FAILURE':
            return {
                ...state,
                error: action.error,
                state: false
            }
        default:
            return state;
    }
}

export default answerReducer;