import React, {FC, useState} from 'react';
import {useTheme} from "../../../../../../context/ThemeContext";

import Button, {BtnVariants} from "../../../../Button/Button";

import styles from "./DropdownList.module.css"

interface DropdownListProps {
    onClick: any
    onDelete: any
}
const DropdownList:FC<DropdownListProps> = (props) => {
    const {isDarkTheme} = useTheme()

    const [open, setOpen] = useState<boolean>(false);

    const handleToggleDropDown = () => setOpen(prevState => {
        return !prevState
    });

    return (
        <div className={styles.blockRight} onClick={handleToggleDropDown}>
            <button className={styles.button}>
                <svg className={`${isDarkTheme ? styles.dark : styles.button}`} width="20" height="4" viewBox="0 0 20 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 2C0 3.10267 0.897333 4 2 4C3.10267 4 4 3.10267 4 2C4 0.897333 3.10267 0 2 0C0.897333 0 0 0.897333 0 2ZM10 4C8.89733 4 8 3.10267 8 2C8 0.897333 8.89733 0 10 0C11.1027 0 12 0.897333 12 2C12 3.10267 11.1027 4 10 4ZM18 4C16.8973 4 16 3.10267 16 2C16 0.897333 16.8973 0 18 0C19.1027 0 20 0.897333 20 2C20 3.10267 19.1027 4 18 4Z"/>
                </svg>
            </button>
            {open &&
            <div className={styles.menu}>
                <Button variant={BtnVariants.forDropDawn} children="Edit" onClick={props.onClick}></Button>
                <Button variant={BtnVariants.forDropDawn} children="Delete" onClick={props.onDelete} ></Button>
            </div>
            }
        </div>
    );
};

export default DropdownList;