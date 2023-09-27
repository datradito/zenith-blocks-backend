import { useEffect } from 'react';
import { Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDisconnect } from 'wagmi';
import Login from '../Components/pages/Home/logIn';

const PrivateRoute = ({ component, ...rest }) => {
    const { isLoggedIn } = useSelector(state => state.auth);
    const token = sessionStorage.getItem("authToken");
    const { disconnectAsync } = useDisconnect();
    

    useEffect(() => {
        if (isLoggedIn === false || !token) {
            disconnectAsync();
        } 
    }, []);


    return isLoggedIn ? <Outlet /> : (
        <Login />
    );
};

export default PrivateRoute;