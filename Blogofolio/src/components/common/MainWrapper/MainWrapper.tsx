import React, {FC, ReactNode} from 'react';

import Footer from "./Footer/Footer";
import {useTheme} from "../../../context/ThemeContext";
import Header from "./Header/Header";

import styles from "./MainWrapper.module.css"

interface MainProps {
    children: ReactNode,
}

const MainWrapper:FC<MainProps> = ({children}) => {
    const {isDarkTheme} = useTheme()

    return (
        <div className={`${isDarkTheme ? styles.dark : styles.light}`}>
            <Header/>
            <div className={styles.block}>
                <main className={styles.wrapper}>
                    {children}
                </main>
                <Footer/>
            </div>
        </div>
    );
};

export default MainWrapper;