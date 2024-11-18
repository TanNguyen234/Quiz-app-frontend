import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function PrivateRoute() {
  const state = useSelector(state => state.userReducer.state)
  const localStorageState = localStorage.getItem('isAuthenticated');
  const isAuthenticated = localStorageState ? JSON.parse(localStorageState) : false;

    return (<>
        {(state || isAuthenticated) ? <Outlet/> : <Navigate to="/user/login" />}
    </>)
}

export default PrivateRoute;