import { get } from "../untils/request"

export const getTopics = async () => {
    try {
        const topics = await get('topics');
        if(topics.code !== 200) {
            return []
        } else {
            return topics.data;
        }
    } catch (error) {
        return []
    }
}