import { useEffect, useState } from 'react';
import './question.scss';
import { useParams } from 'react-router-dom';

function Question() {
    const [data, setData] = useState([]);
    const { id } = useParams();
    useEffect(() => { 
        
    }, [])
    return (<>
    ok
    </>)
}

export default Question;