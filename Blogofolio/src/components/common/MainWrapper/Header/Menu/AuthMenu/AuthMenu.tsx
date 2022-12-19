import React, {FC} from 'react';
import {MenuProps} from "../Menu";
import {LinksVariants} from "../../../../PageWrapper/Breadcrumbs/Breadcrumbs.";

import LoggedInUser from "../../LoggedInUser/LoggedInUser";
import ThemeChange from "../ThemeChange/ThemeChange";
import Button, {BtnVariants, ButtonTypeProps} from "../../../../Button/Button";

import {Link} from "react-router-dom";
import {Routes} from "../../../../../AppRouter/routes";

import {useTheme} from "../../../../../../context/ThemeContext";
import {setUserAction} from "../../../../../../store/reducers/userReducer";
import {useDispatch} from "react-redux";

import styles from "../Menu.module.css";

const AuthMenu:FC<MenuProps> = ({light, dark}) => {
    const {isDarkTheme} = useTheme()
    const dispatch = useDispatch()

    const logOut = () => {
        dispatch(setUserAction(null))
        localStorage.removeItem("access")
        localStorage.removeItem("refresh")
    }

    return (
        <div className={`${isDarkTheme ? styles.dark : ""} ${styles.menuWrapper}`}>
            <div className={styles.top}>
                <LoggedInUser forMenu />
                <Link to={Routes.blog} className={`${isDarkTheme ? styles.dark : ""} ${styles.link}`}>{LinksVariants.home}</Link>
                <Link to={Routes.addPost} className={`${isDarkTheme ? styles.dark : ""} ${styles.link}`}>{LinksVariants.AddPost}</Link>
            </div>
            <div className={styles.bottom}>
                <ThemeChange light={light} dark={dark}/>
                <Button variant={BtnVariants.forSignInMenu} type={ButtonTypeProps.submit} onClick={logOut} children="Log Out"/>
            </div>
        </div>
    );
};

export default AuthMenu;