import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom'

function PrivateRoute () {
    const state = useSelector(state => state.userReducer);
    console.log(state)
    return (<>
       {true ? <Outlet /> : <></>}
    </>)
}

export default PrivateRoute;