import React, {FC, MouseEventHandler, ReactNode} from 'react';
import { useTheme} from "../../../context/ThemeContext";

import styles from "./Button.module.css"

export enum BtnVariants {
    forForm="forForm",
    forSignInMenu = "forSignInMenu",
    cancel = "Cancel",
    addPost = "Add Post",
    deletePost = "Delete Post",
    forDropDawn = "forDropDawn",
    editPost = "Edit Post",

}

export enum ButtonTypeProps {
   button = "button",
   submit ="submit",
   reset = "reset"
}

export interface ButtonProps {
    id?: number
    variant?:BtnVariants
    children: ReactNode
    type?: ButtonTypeProps
    clicked?: boolean
    onClick?: MouseEventHandler
    disabled?: boolean,
}

const Button: FC<ButtonProps> = (
    {
        variant = BtnVariants.forForm,
        clicked= false,
        type= ButtonTypeProps.button,
        children,
        onClick= () => {},
        disabled = false
    }) => {
    const {isDarkTheme} = useTheme()

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
                ${variant === BtnVariants.forForm ? styles.signInBtn
                : variant === BtnVariants.forSignInMenu ? styles.menuBtnSign 
                : variant === BtnVariants.cancel ? styles.cancel 
                : variant === BtnVariants.addPost ? styles.addPost
                : variant === BtnVariants.deletePost ? styles.delete
                : variant === BtnVariants.editPost ? styles.edit
                : isDarkTheme && variant === BtnVariants.forDropDawn ? styles.dark : styles.link            
            }
                ${clicked ? styles.active : styles.default} 
            `}
            type={type}>
            {children}
        </button>
    );
};

export default Button;