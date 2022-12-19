import React, {FC, useEffect, useState} from 'react';
import Tabs from "../../common/Tabs/Tabs";
import {TABS_CONFIG} from "../../../mocks/TabsConfig";
import {PageProps} from "../../AppRouter/routes";
import PageWrapper from "../../common/PageWrapper/PageWrapper";
import {IPostCard} from "../../common/PostsList/PostCard/PostCard";

import Pagination from "../../common/Pagination/Pagination";
import AdaptivePostList from "../../common/PostsList/AdaptivePostList/AdaptivePostList";
import PostsList from "../../common/PostsList/PostsList";

import sortService from "../../../services/sortService";
import postsService from "../../../services/postsService";

import {useDispatch, useSelector} from "react-redux";
import {useScreenWidth} from "../../../context/ScreenWidthContext";
import {useLocation} from "react-router-dom";
import {usePagination} from "../../../context/PaginationContext";

import {setCardsAction} from "../../../store/reducers/selectedCardReducer";
import {handlePosts} from "../../../store/asyncActions/postsActions";
import {setAllPostsAction} from "../../../store/reducers/postsReducer";

const BlogPage:FC<PageProps> = (props) => {
    const dispatch = useDispatch();
    const {isDesktopView} = useScreenWidth()

    const { handleGetPaginationParams, pageResults, activePage} = usePagination();

    const { cards } = useSelector((state: any) => state.selectedCard);
    const {myPosts} = useSelector((state: any) => state.myPosts);

    const [activeTabItem, setActiveTabItem] = useState(TABS_CONFIG[0].id)
    const handleSetActiveTabItem = (id:number) => setActiveTabItem(id)

    const [posts, setPosts] = useState<IPostCard[]>([]);

    const { search } = useLocation();
    const ordering = search.split("?ordering=")[1]

    const handleOrdering = async () => {
        if (ordering) {
            const response = await sortService.getSortResults(ordering);

            const { results} = response;
            if (Array.isArray(results)) {
                dispatch(setCardsAction(results))
                dispatch(setAllPostsAction(results))
            }
        }
        else {
            getPosts()
            dispatch(handlePosts())
        }
    }

    useEffect(()=> {
        handleOrdering()
    }, [search])

    // const handleMyPosts = async (token: string) => {
    //     return await myPostsService.getMyPosts(token)
    // }
    //
    // const setMyPosts = async () => {
    //     try {
    //         dispatch(await handleMyPosts(localStorage.getItem("access") || ""))
    //     } catch (e){
    //     }
    // }

    const filterPosts = () => {
        switch (activeTabItem) {
            case 2:
               return setPosts(cards.filter((card: IPostCard) => card.favorite));
            case 3: {
                return setPosts(myPosts)}
            default:
                setPosts(cards)
        }
    }

    const getPosts = async () => {
        await handleGetPaginationParams(postsService.getPostsResultsFirstPage.bind(null, 12))
    }

    useEffect(() => {
        getPosts()
        dispatch(handlePosts())
    }, [])

    useEffect(() => {
        dispatch(setCardsAction(pageResults))
        setPosts(cards)
    }, [pageResults])

    useEffect(() => {
        filterPosts()
    }, [activeTabItem, cards])

    return (
        <PageWrapper title={props.title}>
            <Tabs config={TABS_CONFIG} activeTabItem={activeTabItem} onClick={handleSetActiveTabItem}/>
                {!isDesktopView ? <AdaptivePostList posts={posts}/> : <PostsList posts={posts} pagination={activePage}/>}
                {activeTabItem === 2 && cards.filter((card: IPostCard) => card.favorite).length > 11 && <Pagination/>}
                {activeTabItem === 1 && !ordering ? <Pagination items={posts}/> : <></>}
        </PageWrapper>
    );
};

export default BlogPage;