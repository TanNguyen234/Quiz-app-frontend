import { post } from "../untils/request"

export const submitAnswer = async (userId, topicId, answers) => {
   const options = {
     userId,
     topicId,
     answers
   }
   const data = await post('answers/submit', options)
   return data
}