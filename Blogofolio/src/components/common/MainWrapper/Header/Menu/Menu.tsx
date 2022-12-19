import React, {FC, MouseEventHandler} from 'react';

import AuthMenu from "./AuthMenu/AuthMenu";
import NotAuthMenu from "./NotAuthMenu/NotAuthMenu";

export interface MenuProps {
    authorized: boolean
    light: MouseEventHandler
    dark: MouseEventHandler
    onClick?: MouseEventHandler;
}
const Menu:FC<MenuProps> = ({...props}) => {
    return (
        <>
          {!!props?.authorized ? <AuthMenu {...props}/> : <NotAuthMenu {...props}/>}
        </>
    );
};

export default Menu;