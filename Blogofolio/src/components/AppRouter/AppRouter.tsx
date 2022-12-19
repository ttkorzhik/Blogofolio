import React, {FC, useEffect, useState} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";

import {PRIVATE_ROUTES, PUBLIC_ROUTES} from "./routes"
import {useDispatch, useSelector} from "react-redux";
import {handleGetUser} from "../../store/asyncActions/userActions";

const AppRouter: FC = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state: any) => state?.user);

    const handleGetUserSession = async () => {
        const accessToken = localStorage.getItem("access") || "";
        const refreshToken = localStorage.getItem("refresh") || "";
        if (!!accessToken && !!refreshToken) {
            dispatch(handleGetUser(accessToken, refreshToken));
        }
    }

    useEffect(() => {
        handleGetUserSession()
    }, [])

    return (
            <Routes>
                {!!user
                    ?
                    PRIVATE_ROUTES.map(({ path, Element, title}) => <Route key={path} path={path} element={<Element title={title} />} />)
                    :
                    PUBLIC_ROUTES.map(({ path, Element, title}) => <Route key={path} path={path} element={<Element title={title} />} />)
                }

                <Route path={"*"} element={<Navigate to={!!user ? "/blog" : "/signin"} replace />} />
            </Routes>
    );
};

export default AppRouter;