import React, {FC, useState} from 'react';

import TabItem from "./TabItem/TabItem";
import {ITabItem} from "./TabItem/TabItem";
import Select from "./Select/Select";
import {Routes} from "../../AppRouter/routes";

import {useTheme} from "../../../context/ThemeContext";
import {useLocation, useNavigate} from "react-router-dom";

import styles from "./Tabs.module.css"

interface TabsProps {
    config: ITabItem[]
    activeTabItem: number
    onClick: any
}

const Tabs:FC<TabsProps> = ({
    config= [],
    activeTabItem= 1,
    onClick = () => {}
}
) => {
    const [selectVaLue, setSelectValue] = useState("Ordered By")

    const {isDarkTheme} = useTheme()
    const navigate = useNavigate()
    const location = useLocation()

    const handleSelectValue  = async (event: any) => {
        if (event.target.value === "All") {
            setSelectValue(event.target.value)
            navigate(Routes.blog)
        }
        else {setSelectValue(event.target.value);
            location.search = `?search=${event.target.value}`
            navigate(`${Routes.blog}?ordering=${event.target.value.toLowerCase()}`)}
    }

    return (
        <nav className={`${isDarkTheme ? styles.dark : ""} ${styles.nav}`}>
            {config.map(tabItem =>
                <TabItem key={tabItem.id} id={tabItem.id}
                         activeTabItem={activeTabItem}
                         disabled={tabItem.disabled}
                         onClick={() => onClick(tabItem.id)}
                         title={tabItem.title}/>)}
            <Select selectValue={selectVaLue} onChange={handleSelectValue}></Select>
        </nav>
    );
};

export default Tabs;