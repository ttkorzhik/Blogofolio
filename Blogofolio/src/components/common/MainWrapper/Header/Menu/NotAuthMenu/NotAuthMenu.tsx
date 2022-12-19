import React, {FC} from 'react';
import {MenuProps} from "../Menu";
import {LinksVariants} from "../../../../PageWrapper/Breadcrumbs/Breadcrumbs.";

import {useTheme} from "../../../../../../context/ThemeContext";
import ThemeChange from "../ThemeChange/ThemeChange";
import Button, {BtnVariants, ButtonTypeProps} from "../../../../Button/Button";

import {Routes} from "../../../../../AppRouter/routes";
import {Link} from "react-router-dom";

import styles from "../Menu.module.css";

const NotAuthMenu:FC<MenuProps> = ({light, dark}) =>{
    const {isDarkTheme} = useTheme()

    return (
        <div className={`${isDarkTheme ? styles.dark : ""} ${styles.menuWrapper}`}>
            <div className={styles.top}>
                <Link to={Routes.blog} className={`${isDarkTheme ? styles.dark : ""} ${styles.link}`}>{LinksVariants.home}</Link>
            </div>
            <div className={styles.bottom}>
                <ThemeChange light={light} dark={dark}/>
                <Link className={styles.route} to={Routes.signIn}>
                    <Button variant={BtnVariants.forSignInMenu} type={ButtonTypeProps.submit} onClick={() => console.log("Hi")} children="Log In"/>
                </Link>
            </div>
        </div>
    );
};

export default NotAuthMenu;