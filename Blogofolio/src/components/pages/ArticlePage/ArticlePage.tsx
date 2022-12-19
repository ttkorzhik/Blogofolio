import React, {FC, useEffect, useState} from 'react';

import Content from "./Content/Content";
import PageWrapper from "../../common/PageWrapper/PageWrapper";
import {handleArticle} from "../../../store/asyncActions/articleActions";
import {setArticleAction} from "../../../store/reducers/articleReducer";
import ArticlePagination from "../../common/Pagination/ArticlePagination";

import {IPostCard} from "../../common/PostsList/PostCard/PostCard";
import {PageProps} from "../../AppRouter/routes";

import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";

import styles from "./ArticlePage.module.css"

const ArticlePage:FC<PageProps> = () => {

    const [post, setPost] = useState<IPostCard | null>(null);
    const [nextPostTitle, setNextPostTitle] = useState<string>("");
    const [prevPostTitle, setPrevPostTitle] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true)

    const {allPosts} = useSelector((state:any) => state.allPosts)
    const { id = 1 } = useParams()
    const {article} = useSelector((state:any) => state.article)
    const selectedPost = allPosts.find((post: IPostCard) => post.id === +id);

    const dispatch = useDispatch();

    const getPost = async () => {
        await dispatch(handleArticle(+id))
    }

    useEffect(() => {
            dispatch(setArticleAction(null))
            getPost()
    }, [id])

    useEffect(() => {
        setPost(article)
        setNextPostTitle(!!nextPost?.title ? nextPost?.title : null)
        setPrevPostTitle(!!prevPost?.title ? prevPost?.title : null)
    },)

    const navigate = useNavigate();
    const next = allPosts.indexOf(selectedPost) + 1;
    const nextPost = allPosts.find((post: IPostCard, index: number) => next === index);
    const prev = allPosts.indexOf(selectedPost) - 1;
    const prevPost = allPosts.find((post: IPostCard, index: number) => prev === index);
    const handleNext = () => navigate(`/blog/${nextPost?.id}`)
    const handlePrev = () => navigate(`/blog/${prevPost?.id}`)

    useEffect(() => {
        if (article || nextPost || prevPost) {
            setLoading(true)
        }
        else setLoading(false)
    }, [post])


    if (post) {
        return (
            <PageWrapper title={post.title}>
                    <div className={styles.wrapperArticle}>
                    <Content post={post}/>
                    </div>
                    <ArticlePagination
                        onClickNext={handleNext}
                        onClickPrev={handlePrev}
                        disabledNext={!nextPost}
                        disabledPrev={!prevPost}
                        prevTitle={prevPostTitle}
                        nextTitle={nextPostTitle}/>
            </PageWrapper>
        );
    }
    else if (!post && loading) {
        return (
            <div className={styles.message}></div>
        );
    }
    else return  <div className={styles.message}>Article not found :(</div>
};

export default ArticlePage;