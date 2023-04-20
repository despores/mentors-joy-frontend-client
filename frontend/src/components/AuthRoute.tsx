import {useNavigate} from "react-router-dom";
import React, {ReactDOM, useEffect} from "react";
import {getAuthToken} from "../services/authentication";

export const AuthRoute = ({children}: {children: JSX.Element}) => {
    const navigate = useNavigate();
    const accessToken = getAuthToken();

    useEffect(() => {
        if (!accessToken) {
            navigate('/login_academic')
        }
    }, [accessToken, navigate])

    return accessToken ? children : <></>
}