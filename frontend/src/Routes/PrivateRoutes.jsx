import { useEffect } from 'react';
import { Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDisconnect } from 'wagmi';
import { useDispatch } from 'react-redux';
import Login from '../Components/pages/Home/logIn';
import { setIsLoggedIn } from '../actions/createAuthAction';
import ResponsiveHeaderBar from "../Components/DisplayElements/Header/Header.jsx";

const PrivateRoute = ({ children }) => {
    const { isLoggedIn } = useSelector(state => state.auth);
    const token = sessionStorage.getItem("authToken");
    const dispatch = useDispatch();
    const { disconnectAsync } = useDisconnect();
    
    useEffect(() => {
        if (isLoggedIn === false || !token) {
            dispatch(setIsLoggedIn(false));
            disconnectAsync();
        } 
    }, []);



    return isLoggedIn ? (
      children
    ) : (
      <>
        <ResponsiveHeaderBar />
        <Login />
      </>
    );
};

export default PrivateRoute;