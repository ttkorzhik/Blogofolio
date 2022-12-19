import React, {FC, useEffect} from 'react';
import {IPostCard} from "../../../common/PostsList/PostCard/PostCard";
import Actions, {ActionsVariants} from "../../../common/PostsList/PostCard/Actions/Actions";
import {selectImgAction} from "../../../../store/reducers/selectedCardReducer";
import {handlePosts} from "../../../../store/asyncActions/postsActions";

import {useTheme} from "../../../../context/ThemeContext";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";

import styles from "./Content.module.css"

export interface ContentProps {
    post: IPostCard
}

const Content:FC<ContentProps> = ({post}) => {
    const {isDarkTheme} = useTheme()
    const dispatch = useDispatch();

    const { id = 1 } = useParams()
    const {cards} = useSelector((state:any) => state.selectedCard)
    const selectedPost = cards.find((post: IPostCard) => post.id === +id);

    const handleImgSelect = () => dispatch(selectImgAction(post.image))

    const getPosts = async () => {
        await dispatch(handlePosts())
    }

    useEffect(() => {
        if (!cards.length) {
            getPosts()
        }
    }, [])

        return (
                <div className={styles.mainBlock}>
                    <div className={styles.blockImg}>
                        <img className={styles.img} src={post.image} alt="MainPicture" onClick={handleImgSelect}/>
                    </div>
                    <div className={styles.blockContent}>
                        <p className={`${isDarkTheme ? styles.dark : ""} ${styles.text}`}>{post.text}</p>
                        {selectedPost ? <Actions variant={ActionsVariants.forContent} post={selectedPost}/> :
                        <Actions variant={ActionsVariants.forContent} post={post}/>}
                    </div>
                </div>
        );
};

export default Content;