import React, {FC, MouseEventHandler} from 'react';

import search from "../../../../../assets/search.svg"

import styles from "./Search.module.css"

interface SearchProps {
    onClick:MouseEventHandler
}

const Search:FC<SearchProps> = (props) => {
    return (
        <div className={styles.searchBlock}>
            <button className={styles.searchLink} onClick={props.onClick}>
                <img src={search} alt="search" className={styles.searchImg}/>
            </button>
        </div>
    );
};

export default Search;