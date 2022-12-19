import React, {FC} from 'react';
import {useTheme} from "../../../../context/ThemeContext";

import styles from "./Title.module.css"

interface TitleProps {
    text: string
}

const Title:FC<TitleProps> = ({text= ""}) => {
    const {isDarkTheme} = useTheme()

    return (
        <h2 className={`${isDarkTheme ? styles.dark : ""} ${styles.title}`}>
            {text}
        </h2>
    );
};

export default Title;