import React, {FC} from 'react';
import {useTheme} from "../../../context/ThemeContext";
import {InputError} from "../Input/Input";

import styles from "./Textarea.module.css"

export enum textareaNames {
    Text= "Text",
    Description = "Description"
}

export interface TextareaProps {
    title: string
    value: string
    onChange: any
    id: string
    placeholder?: string
    name?: textareaNames,
    error?: InputError
}

const Textarea:FC<TextareaProps> = ({
     id= "",
     title = "",
     value= "",
     onChange,
     name = textareaNames.Description,
     placeholder = "",
     error}) => {

    const {isDarkTheme} = useTheme()

    return (
        <div className={styles.textareaWrapper}>
            <label className={`${isDarkTheme ? styles.dark : ""} ${styles.label}`} htmlFor={id}>
                {title}
                <textarea
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`${error?.error ? styles.error : styles.textarea}
                    ${name === textareaNames.Text && styles.text}`}
                />
                {error?.error && <p className={styles.errorMessage}>{error.text}</p>}
            </label>
        </div>
    );
};

export default Textarea;