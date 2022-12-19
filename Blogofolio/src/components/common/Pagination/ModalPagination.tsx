import React, {FC, MouseEventHandler} from 'react';
import {useTheme} from "../../../context/ThemeContext";

import styles from "./Pagination.module.css";

export interface InnerPaginationProps {
    onClickNext?: MouseEventHandler
    onClickPrev?: MouseEventHandler
    disabledNext?: boolean
    disabledPrev?: boolean
}

const ModalPagination:FC<InnerPaginationProps> = ({onClickNext, onClickPrev, disabledNext, disabledPrev}) => {
    const {isDarkTheme} = useTheme();

    return (
        <div className={`${styles.modal} ${styles.pagination}`}>
            <button className={styles.button} onClick={onClickPrev} disabled={!disabledPrev}>
                <svg className={`${isDarkTheme ? styles.dark : ""} ${styles.svg}`} width="18" height="15" viewBox="0 0 18 15" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.70945 0.292384C7.89945 0.492383 7.99945 0.742383 7.99945 1.00238C7.99945 1.26238 7.89945 1.51238 7.70945 1.71238L3.40945 6.00238L16.9995 6.00238C17.5495 6.00238 17.9995 6.45238 17.9995 7.00238C17.9995 7.55238 17.5495 8.00238 16.9995 8.00238L3.40945 8.00238L7.70945 12.2924C8.09945 12.6824 8.09945 13.3224 7.70945 13.7124C7.31945 14.1024 6.67945 14.1024 6.28945 13.7124L0.289453 7.71238C0.199453 7.62238 0.129453 7.51238 0.0794534 7.39238C0.0594534 7.34238 0.0394534 7.30238 0.0394534 7.25238C-0.0105466 7.09238 -0.0105466 6.91238 0.0394534 6.75238C0.0394534 6.70238 0.0594534 6.66238 0.0794534 6.61238C0.129453 6.49238 0.199453 6.38238 0.289453 6.29238L6.28945 0.292383C6.67945 -0.0976169 7.31945 -0.0976168 7.70945 0.292384Z"/>
                </svg>
                <span className={`${isDarkTheme ? styles.dark : ""} ${styles.span}`}>Prev</span>
            </button>
            <button className={styles.button} onClick={onClickNext} disabled={!disabledNext}>
                <span className={`${isDarkTheme ? styles.dark : ""} ${styles.span}`}>Next</span>
                <svg className={`${isDarkTheme ? styles.dark : ""} ${styles.svg}`} width="18" height="15" viewBox="0 0 18 15" xmlns="http://www.w3.org/2000/svg">
                    <path  d="M10.2905 14.7076C10.1005 14.5076 10.0005 14.2576 10.0005 13.9976C10.0005 13.7376 10.1005 13.4876 10.2905 13.2876L14.5905 8.99762L1.00055 8.99762C0.450549 8.99762 0.000547739 8.54762 0.000547715 7.99762C0.000547691 7.44762 0.450548 6.99762 1.00055 6.99762L14.5905 6.99762L10.2905 2.70762C9.90055 2.31762 9.90055 1.67762 10.2905 1.28762C10.6805 0.897618 11.3205 0.897617 11.7105 1.28762L17.7105 7.28762C17.8005 7.37762 17.8705 7.48762 17.9205 7.60762C17.9405 7.65762 17.9605 7.69762 17.9605 7.74762C18.0105 7.90762 18.0105 8.08762 17.9605 8.24762C17.9605 8.29762 17.9405 8.33762 17.9205 8.38762C17.8705 8.50762 17.8005 8.61762 17.7105 8.70762L11.7105 14.7076C11.3205 15.0976 10.6805 15.0976 10.2905 14.7076Z" />
                </svg>
            </button>
        </div>
    );
};

export default ModalPagination;