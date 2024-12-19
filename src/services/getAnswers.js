import { getCookie } from "../helpers/cookie"
import { auth } from "../untils/request"

export const getAnswers = async (id = '') => {
    var path = 'answers/result'
    try {
        if(id) {
            path += `?id=${id}`
        }
        const token = getCookie('token')
        const answers = await auth(path, token);
        if(answers.code !== 200) {
            return []
        } else {
            return answers.data;
        }
    } catch (error) {
        return []
    }
}