import { useEffect, useState } from 'react';
import './topic.scss'
import { getTopics } from '../../services/getTopics';
import { getQuestions } from '../../services/getQuestions';

function Topics() {
   const [data, setData] = useState([]);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
    const fetchApi = async () => {
        const topics = await getTopics();

        if(topics.length > 0) {
            setData(topics)
            const updateTopics = await Promise.all(
                topics.map(async (topic) => {
                    const totalQuestions = await getQuestions(topic._id);
                    topic.totalQuestions = totalQuestions.length;
                    return topic;
                })
            )
            setData(updateTopics);
            setIsLoading(false);
        }
    }
    fetchApi();
   }, [])

   return (<>
   <div>{isLoading ? (<p>Is loading...</p>) : (data.map((topic) => (
        <div key={topic._id} className="topic-item">
            <h2>{topic.title}</h2>
            <p>Total Questions: {topic.totalQuestions}</p>
        </div>
    )))}</div>
   </>)
}

export default Topics;