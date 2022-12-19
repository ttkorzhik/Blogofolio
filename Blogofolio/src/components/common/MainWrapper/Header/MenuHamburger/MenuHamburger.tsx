import React, {FC, MouseEventHandler, useEffect, useRef, useState} from 'react';

import styles from "./MenuHamburger.module.css"
import Menu from "../Menu/Menu";
import {ThemeVariant, useTheme} from "../../../../../context/ThemeContext";


interface MenuHamburgerProps {
    authorized: boolean
    open?: boolean
    onClick?: MouseEventHandler
}

const MenuHamburger:FC<MenuHamburgerProps> = ({authorized}
) => {
    const {setTheme} = useTheme()
    const [open, setOpen] = useState<boolean>(false);
    const handleToggleBurgerMenu = (e:any) => {
        setOpen(prevState => !prevState);
    }

    return (
        <div className={styles.burgerBlock} onClick={handleToggleBurgerMenu}>
            <div className={styles.burger}>
            <span
                className={`
                ${styles.span} 
                ${!open ? styles.span : styles.active} 
            `}>
            </span>
            </div>
            {open && <Menu authorized={authorized} dark={()=> setTheme(ThemeVariant.dark)} light={()=> setTheme(ThemeVariant.light)}></Menu>}
        </div>
    );
};

export default MenuHamburger;