import React, {FC, useEffect} from 'react';
import SearchList from "./SearchList/SearchList";
import {PageProps} from "../../AppRouter/routes";
import PageWrapper from "../../common/PageWrapper/PageWrapper";
import Pagination from "../../common/Pagination/Pagination";
import SearchService from "../../../services/searchService";

import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {usePagination} from "../../../context/PaginationContext";

import {setCardsAction} from "../../../store/reducers/selectedCardReducer";
import {handlePosts} from "../../../store/asyncActions/postsActions";
import Title from "../../common/PageWrapper/Title/Title";

const SearchPage:FC<PageProps> = () => {
    const dispatch = useDispatch()
    const { search } = useLocation();
    const { handleGetPaginationParams, pageResults} = usePagination();
    const { cards } = useSelector((state: any) => state.selectedCard);

    const query = search.split("?search=")[1]

    const handleSearch = async () => {
        await handleGetPaginationParams(SearchService.getSearchResults.bind(null, query))
    }

    useEffect(() => {
        dispatch(setCardsAction(pageResults))
    }, [pageResults])

    useEffect(() => {
        dispatch(handlePosts(query))
        handleSearch()
    }, [search])

    function decode_utf8(s: string) {
        return decodeURIComponent(s);
    }
    return (
        <PageWrapper title={!!query ? `Search Results '${decode_utf8(query)}'` : ""}>
            <SearchList posts={cards} query={query}/>
            {!!query && <Pagination items={pageResults}/>}
        </PageWrapper>
    );
};

export default SearchPage;