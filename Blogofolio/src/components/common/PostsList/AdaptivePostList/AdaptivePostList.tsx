import React, {FC} from 'react';
import {PostsListProps} from "../PostsList";
import PostCard from "../PostCard/PostCard";

import styles from "../PostsList.module.css";

const AdaptivePostList:FC<PostsListProps> = ({
      posts= [],
      }) => {
    return (
        <div className={styles.adaptive}>
           {posts.map((post, index) =>
            <PostCard key={post.id} {...post} size={"medium"}/>)
               .filter((post, index) => index <= 9)
            }
        </div>
    );
};

export default AdaptivePostList;