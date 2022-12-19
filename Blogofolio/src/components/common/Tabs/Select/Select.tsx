import React, {FC} from 'react';
import {useTheme} from "../../../../context/ThemeContext";

import styles from "../Tabs.module.css";

interface SelectProps {
    selectValue: string
    onChange: any
}
const Select:FC<SelectProps> = ({selectValue, onChange}) => {
    const {isDarkTheme} = useTheme()

    return (
        <select className={`${isDarkTheme ? styles.darkItem : ""} ${styles.item}`}
                value={selectValue}
                onChange={onChange}>
            <option disabled={true} value="Ordered By">Ordered By</option>
            <option value="Title">Title</option>
            <option value="Lesson_num">Lesson_num</option>
            <option value="Date">Date</option>
            <option value="All">All</option>
        </select>
    );
};

export default Select;