import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth, selectAuth } from "../store/authSlice";
import { useEffect } from "react";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { authActions } from "../store/authSlice";

const Home : React.FC = () => {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const auth = useSelector(selectAuth);
    const { isAuthenticated } = auth;

    // 아마 헤더에 넣어놓지 않을까 싶다.
    
    const handleLogout = async (e: React.FormEvent) => {
        e.preventDefault();
        
        await axios.post(process.env.REACT_APP_NODE_URL +'/api/logout' , {}, {
            withCredentials: true,
        });
        dispatch(authActions.logout());
        localStorage.removeItem('accessToken');
    }

    useEffect(() => {
        if (!isAuthenticated) {
            dispatch(checkAuth());
        }
    }, [dispatch, isAuthenticated])
    return (
        <div className="Home">
            <button onClick={handleLogout}>{isAuthenticated ? 'Log-out' : 'Log-in'}</button>
            
            <h1>{auth.accessToken}</h1>
            <h1>This is My Home</h1>
        </div>
    )
}

export default Home;