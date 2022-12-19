import React, {FC} from 'react';
import {ThemeVariant, useTheme} from "../../../../context/ThemeContext";

import styles from "./TabItem.module.css"

export interface ITabItem {
    id: number
    title: string
    disabled?: boolean
}

interface TabItemProps extends ITabItem{
    activeTabItem: number
    onClick: any
}
const TabItem:FC<TabItemProps> = ({
     id = 0,
     activeTabItem = 0,
     title= "",
     onClick = () => {},
     disabled=false} ) => {

    const {theme, isDarkTheme} = useTheme()

    return (
        <li className={`${styles.item}
         ${(activeTabItem === id && theme === ThemeVariant.light) ?
            styles.bordered : (activeTabItem === id && isDarkTheme) ?
            styles.borderDark : ""}`}
            onClick={!disabled ? onClick : () => {}}>
            <a className={`${isDarkTheme && disabled ? styles.disabled : isDarkTheme ? styles.dark : ""}
               ${disabled ? styles.disabled : styles.link}`}>
               {title}
            </a>
        </li>
    );
};

export default TabItem;
