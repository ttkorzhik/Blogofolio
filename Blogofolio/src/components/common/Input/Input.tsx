import React, {FC, MouseEventHandler} from 'react';
import {useTheme} from "../../../context/ThemeContext";

import styles from "./Input.module.css";

export interface InputError {
    text: string | null
    error: boolean
}

export interface InputProps {
    title: string
    value: string
    onChange: any
    id: string
    error?: InputError
    disabled?: boolean
    placeholder?: string
    type?: string
    name?: string
    page?: string
    required?: boolean
}

const Input: FC<InputProps> = (
    {
        id= "",
        title = "",
        type = "text",
        value= "",
        onChange = () => {},
        name = "",
        disabled= false,
        placeholder = "",
        page = "",
        error= {text: null, error: false}
    }) => {
    const {isDarkTheme} = useTheme()

    return (
        <div className={styles.inputWrapper}>
            <label className={`${isDarkTheme ? styles.dark : ""} ${styles.label}`} htmlFor={id}>
                {title}
                <input
                    id={id}
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    className={`${error?.error ? styles.error : !!page ? styles.inputAdd : styles.input}`}
                    placeholder={placeholder}
                />
            </label>
            {error?.error && <p className={styles.errorMessage}>{error.text}</p>}
        </div>
    );
};

export default Input;