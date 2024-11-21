import { get } from "../untils/request"

export const getAnswers = async (id = '') => {
    var path = 'answers/result'
    try {
        if(id) {
            path += `?id=${id}`
        }
        const answers = await get(path);
        if(answers.code !== 200) {
            return []
        } else {
            return answers.data;
        }
    } catch (error) {
        return []
    }
}