import React, {FC} from 'react';
import PostCardSearch from "./PostCardSearch/PostCardSearch";
import {IPostCard} from "../../../common/PostsList/PostCard/PostCard";

import styles from "./SearchList.module.css"

interface SearchResultsListProps {
    posts: IPostCard[],
    query: string
}

const SearchList:FC<SearchResultsListProps> = ({posts= [], query}) => {
    return (
        <div className={styles.search}>
            {!!query ? (
                posts.map((post: IPostCard) => <PostCardSearch key={post.id} {...post} />)) :
                (<div className={styles.emptyMatches}>
                    {!!query ? `No Results for '${query}'` : "Enter Search Word into Search Field"}
                </div>)}
        </div>
    );
};

export default SearchList;