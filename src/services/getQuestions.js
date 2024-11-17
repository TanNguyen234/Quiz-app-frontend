import { get } from "../untils/request"

export const getQuestions = async (id) => {
    try {
        const questions = await get('questions/' + id);
        if(questions.code !== 200) {
            return []
        } else {
            return questions.data;
        }
    } catch (error) {
        return [];
    }
}