import { post } from "../untils/request"

export const submitAnswer = async (userId, topicId, answers) => {
   const options = {
     userId,
     topicId,
     answers
   }
   
   const data = await post('answers/submit', options)
   if(data.code === 200) {
    return data.data
   } else {
    return []
   }
}