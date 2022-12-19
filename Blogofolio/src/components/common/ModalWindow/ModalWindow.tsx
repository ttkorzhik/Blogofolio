import React, {FC, useEffect, useState} from 'react';
import PostCardBig from "../PostsList/PostCard/PostCardBig/PostCardBig";
import {IPostCard} from "../PostsList/PostCard/PostCard";
import {Routes} from "../../AppRouter/routes";

import {useTheme} from "../../../context/ThemeContext";
import {useDispatch, useSelector} from "react-redux";

import {editCardAction} from "../../../store/reducers/editCardReducer";
import {selectCardAction} from "../../../store/reducers/selectedCardReducer";
import {useNavigate} from "react-router-dom";

import styles from "./ModalWindow.module.css"

const ModalWindow:FC = () => {

    const dispatch = useDispatch()

    const { selectedCard } = useSelector((state: any) => state.selectedCard);
    const [post, setPost] = useState<IPostCard>(selectedCard);
    const {cards} = useSelector((state:any) => state.selectedCard)


    useEffect(() => {
            const selectedPost = cards.find((post: IPostCard) => post.id === selectedCard.id);
            setPost(!!selectedPost ? selectedPost : selectedCard)
    },)

    const handleModalClose = () => {
        dispatch (selectCardAction(null))
        dispatch (editCardAction(post))
    }

    const close = (e: any) => {
        if (e.target === e.currentTarget) {
            handleModalClose()
        }
    }
    const {isDarkTheme} = useTheme()

    const navigate = useNavigate()
    const handleEditButton = () => {
        handleModalClose()
        navigate(Routes.editPost)
    }

    return (
        <>
            {!!post &&  <div className={styles.modalWrapper} onClick={close}>
                <div className={`${isDarkTheme ? styles.dark : ""} : ${styles.content}`}>
              <PostCardBig {...post} onClick={handleEditButton}/>
                    <button className={styles.close} onClick={handleModalClose}>
                        <svg className={`${isDarkTheme ? styles.svgForDark : styles.svg}`} width="20" height="20" viewBox="0 0 20 20"  xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.7431 10L19.8461 0.897011C20.0513 0.691822 20.0513 0.359146 19.8461 0.153957C19.6409 -0.0512316 19.3082 -0.0512316 19.103 0.153957L10 9.25688L0.897058 0.153892C0.69187 -0.0512972 0.359194 -0.0512972 0.154006 0.153892C-0.0512479 0.35908 -0.0512479 0.691757 0.154006 0.896946L9.25691 10L0.15394 19.103C-0.0513135 19.3082 -0.0513135 19.6409 0.15394 19.8461C0.256535 19.9487 0.390984 20 0.525499 20C0.660015 20 0.794464 19.9487 0.897058 19.8461L10 10.7431L19.103 19.8461C19.2056 19.9487 19.34 20 19.4745 20C19.6091 20 19.7435 19.9487 19.8461 19.8461C20.0513 19.6409 20.0513 19.3082 19.8461 19.103L10.7431 10Z" />
                        </svg>
                    </button>
                </div>
            </div>}
        </>
    );
};

export default ModalWindow;