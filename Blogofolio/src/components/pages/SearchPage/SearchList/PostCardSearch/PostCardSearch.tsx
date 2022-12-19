import React, {FC,} from 'react';

import Actions, {ActionsVariants} from "../../../../common/PostsList/PostCard/Actions/Actions";
import {IPostCard} from "../../../../common/PostsList/PostCard/PostCard";

import {useTheme} from "../../../../../context/ThemeContext";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {selectCardAction} from "../../../../../store/reducers/selectedCardReducer";

import styles from "./PostCardSearch.module.css"

const PostCardSearch:FC<IPostCard> = (props) => {

    const { id = 1, title, date, image} = props;

    const {isDarkTheme} = useTheme()
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handlePostPageOpen = () => navigate(`/blog/${id}`)

    const handleCardSelect = () => {
        dispatch(selectCardAction(props))
    }

    return (
        <div className={styles.main}>
            <div className={styles.wrapper} onClick={handlePostPageOpen}>
                <div className={styles.imgBlock} >
                    {!!image && <img className={styles.img} src={image} alt="postImage"/>}
                </div>
                <div className={styles.contentBlock}>
                        <p className={styles.date} >{date}</p>
                        <h2 className={`${isDarkTheme ? styles.dark : ""} : ${styles.title}`}>{title}</h2>
                </div>
            </div>
            <Actions post={props} variant={ActionsVariants.forCards} onClick={handleCardSelect}/>
        </div>
    );
};

export default PostCardSearch;