import { Outlet } from "react-router-dom";
import './formLayout.scss'

function FormLayout() {

    return (<>
     <div className="container">
       <div className="form-layout">
        <Outlet />
       </div>
    </div>
    </>)
}

export default FormLayout;