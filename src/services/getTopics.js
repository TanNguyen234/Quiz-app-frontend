import { get } from "../untils/request"

export const getTopics = async (id = '') => {
    var path = 'topics'
    try {
        if(id) {
            path += `?id=${id}`
        }
        const topics = await get(path);
        if(topics.code !== 200) {
            return []
        } else {
            return topics.data;
        }
    } catch (error) {
        return []
    }
}