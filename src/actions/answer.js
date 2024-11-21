import { submitAnswer } from "../services/submitAnswer";

export const answer = (userId, topicId, values, topicTitle) => async (dispatch) => {
    const data = await submitAnswer(userId, topicId, values);
    if(data) {
        dispatch({
            type: "GET_ANSWER",
            data: {
                ...data,
                topicTitle
            }
        });

        return {
            type: "GET_ANSWER",
            ...data,
            topicTitle: topicTitle
        }
    } else {
        return {
            type: "GET_ANSWER_FAILURE",
            error: true
        }
    }
}