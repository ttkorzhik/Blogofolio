import React, {FC, useEffect, useState} from 'react';
import {selectCardAction, selectImgAction} from "../../../store/reducers/selectedCardReducer";
import {IPostCard} from "../PostsList/PostCard/PostCard";
import ModalPagination from "../Pagination/ModalPagination";

import {useTheme} from "../../../context/ThemeContext";
import {useDispatch, useSelector} from "react-redux";

import styles from "./ModalWindow.module.css";

const ModalWindowImg:FC = () => {
    const dispatch = useDispatch()

    const [modal, setModal] = useState(true)
    const [img, setImg] = useState<IPostCard | null>(null);

    const { allPosts } = useSelector((state:any) => state.allPosts)
    const { selectedImg } = useSelector((state: any) => state.selectedCard);
    const {isDarkTheme} = useTheme()

    const handleSetModal = () => setModal(!modal)

    useEffect(() => {
        const image = allPosts.find((post: IPostCard) => post.id === selectedImg.id);
        setImg(!!image ? image : selectedImg)
    }, [])

    const handleModalClose = () => {
        dispatch (selectImgAction(null))
        dispatch (selectCardAction(null))
    }
    const close = (e: any) => {
        if (e.target === e.currentTarget) {
            handleModalClose()
        }
    }

    const next = allPosts.indexOf(img) + 1;
    const nextImg = allPosts.find((post: IPostCard, index: number) => next === index);
    const prev = allPosts.indexOf(img) - 1;
    const prevImg = allPosts.find((post: IPostCard, index: number) => prev === index);
    const handleNext = () => setImg(!!nextImg ? nextImg : null)
    const handlePrev = () => setImg(!!prevImg ? prevImg : null)

    return (
        <div className={styles.modalWrapper} onClick={close}>
            <div className={`${isDarkTheme ? styles.dark : ""} : ${styles.content}`}>
                <img src={img?.image} className={styles.img} onClick={handleSetModal}/>
                <button className={styles.close} onClick={handleModalClose}>
                    <svg className={`${isDarkTheme ? styles.svgForDark : styles.svg}`} width="20" height="20" viewBox="0 0 20 20"  xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.7431 10L19.8461 0.897011C20.0513 0.691822 20.0513 0.359146 19.8461 0.153957C19.6409 -0.0512316 19.3082 -0.0512316 19.103 0.153957L10 9.25688L0.897058 0.153892C0.69187 -0.0512972 0.359194 -0.0512972 0.154006 0.153892C-0.0512479 0.35908 -0.0512479 0.691757 0.154006 0.896946L9.25691 10L0.15394 19.103C-0.0513135 19.3082 -0.0513135 19.6409 0.15394 19.8461C0.256535 19.9487 0.390984 20 0.525499 20C0.660015 20 0.794464 19.9487 0.897058 19.8461L10 10.7431L19.103 19.8461C19.2056 19.9487 19.34 20 19.4745 20C19.6091 20 19.7435 19.9487 19.8461 19.8461C20.0513 19.6409 20.0513 19.3082 19.8461 19.103L10.7431 10Z" />
                    </svg>
                </button>
                {modal && <ModalPagination
                        onClickNext={handleNext}
                        onClickPrev={handlePrev}
                        disabledPrev={!!prevImg}
                        disabledNext={!!nextImg}/>}
            </div>
        </div>
    );
};

export default ModalWindowImg;