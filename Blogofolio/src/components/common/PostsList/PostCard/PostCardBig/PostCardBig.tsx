import React, {FC} from 'react';
import Actions, {ActionsVariants} from "../Actions/Actions";
import {IPostCard} from "../PostCard";

import {selectImgAction} from "../../../../../store/reducers/selectedCardReducer";
import {modifyDate} from "../../../../../utils/dateUtil";

import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useTheme} from "../../../../../context/ThemeContext";

import styles from "./PostCardBig.module.css";

const PostCardBig:FC<IPostCard> = (props) => {
    const { id = 1, title, date, text, image, onClick } = props;

    const {isDarkTheme} = useTheme()
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handlePostPageOpen = () => navigate(`/blog/${id}`)
    const handleImgSelect = () => dispatch(selectImgAction(props));

    return (
            <div className={styles.main}>
                <div className={styles.wrapper}>
                <div className={styles.contentBlock} onClick={handlePostPageOpen}>
                    <div className={styles.dateBlock}>
                        <p className={styles.date}>{modifyDate(date)}</p>
                    </div>
                        <a href={"#"} onClick={(e)=> e.preventDefault()}
                           className={`${isDarkTheme ? styles.dark : ""} : ${styles.title}`}>
                           {title}
                        </a>
                    <p className={styles.content}>{text}</p>
                </div>
                <div className={styles.imgBlock}>
                    {!!image && <img className={styles.img} src={image} alt="postImage" onClick={handleImgSelect}/>}
                </div>
            </div>
                <Actions post={props} variant={ActionsVariants.forCards} onClick={onClick}/>
            </div>
    );
};

export default PostCardBig;