import React, {FC, MouseEventHandler} from 'react';

import {InputProps} from "../Input";
import {useTheme} from "../../../../context/ThemeContext";

import styles from "./FileInput.module.css"

export interface FileInputProps extends InputProps{
    file?: string
    onClick?: MouseEventHandler
}

const FileInput:FC<FileInputProps> = ({
      id= "",
      title = "",
      type = "text",
      value= "",
      onChange,
      name = "",
      disabled= false,
      placeholder = "",
      error= {text: null, error: false},
      file = "",
      onClick = () => {},
                                  }) => {
    const {isDarkTheme} = useTheme()
    return (
        <div className={`${isDarkTheme ? styles.dark : ""} ${styles.wrapper}`}>
            {title}
            <label className={`${disabled ? styles.disabled : error?.error ? styles.error :  ""} ${styles.inputFile}`} htmlFor={id}>
                <span className={`${disabled ? styles.disabled : file === "File" ? styles.placeholder : ""} ${styles.inputFileText}`}>{file}
                </span>
                {file !== "File" &&
                    <button onClick={onClick} className={styles.cross}>
                        <svg className={styles.svg} width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.5838 11.8426L17.5183 7.62478L16.387 6.49341L12.4335 10.7315L8.30464 6.74365L7.15379 7.8552L11.3426 11.901L7.40811 16.1188L8.53948 17.2502L12.4929 13.012L16.6218 16.9999L17.7726 15.8883L13.5838 11.8426Z" fill="#FD3419"/>
                        </svg>
                    </button>}
                <input className={styles.input}
                       id={id}
                       type={type}
                       name={name}
                       value={value}
                       onChange={onChange}
                       disabled={disabled}
                       placeholder={placeholder}
                       accept=".jpg, .jpeg, .png"
                />
                <span className={styles.inputFileBtn}>
                    Upload new
                </span>
                <div className={`${isDarkTheme ? styles.dark : ""} ${styles.inputSvg}`} >
                    <svg width="24" height="24" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.9998 4.41251L8.70676 6.70551C8.31576 7.09651 7.68376 7.09651 7.29276 6.70551C6.90176 6.31451 6.90176 5.68251 7.29276 5.29151L11.2918 1.29151C11.3848 1.19951 11.4958 1.12651 11.6178 1.07551C11.8618 0.974506 12.1378 0.974506 12.3818 1.07551C12.5038 1.12651 12.6148 1.19951 12.7068 1.29151L16.7068 5.29151C17.0978 5.68251 17.0978 6.31451 16.7068 6.70551C16.5118 6.90051 16.2558 6.99851 15.9998 6.99851C15.7438 6.99851 15.4878 6.90051 15.2928 6.70551L12.9998 4.41251V15.9985C12.9998 16.5515 12.5518 16.9985 11.9998 16.9985C11.4478 16.9985 10.9998 16.5515 10.9998 15.9985V4.41251ZM20 16.9985C20 16.4455 20.447 15.9985 21 15.9985C21.553 15.9985 22 16.4455 22 16.9985V19.9985C22 21.6525 20.654 22.9985 19 22.9985H5C3.346 22.9985 2 21.6525 2 19.9985V16.9985C2 16.4455 2.448 15.9985 3 15.9985C3.552 15.9985 4 16.4455 4 16.9985V19.9985C4 20.5505 4.449 20.9985 5 20.9985H19C19.552 20.9985 20 20.5505 20 19.9985V16.9985Z"/>
                    </svg>
                </div>
            </label>
            {error?.error && <p className={styles.errorMessage}>{error.text}</p>}
        </div>

    );
};

export default FileInput;