import React, {FC} from 'react';
import PostCard, {IPostCard} from "./PostCard/PostCard";

import styles from "./PostsList.module.css";

export interface PostsListProps {
    posts: IPostCard[],
    pagination?: number
}

const PostsList:FC<PostsListProps> = ({
      posts= [],
      pagination= 1
}) => {
    const handleSizeForCard = (index:number) => {
        if (index <= 4) {
            return "medium"
        }
        else {
            return "small"
        }
    }
    const handleSizeForCardNext = (index:number) => {
        if (index <= 5) {
            return "medium"
        }
        else {
            return "small"
        }
    }

    return (
        <>
            {pagination === 1 ?
                <div className={styles.wrapper}>
                    <div className={`${styles.leftBlock}`}>
                        <div className={styles.postsShorted}>
                            {posts
                                .map((post, index) =>
                                    <PostCard key={post.id} {...post} size={"big"}/>)
                                .filter((post, index) => index === 0)
                            }

                            {posts
                                .map((post, index) =>
                                    <PostCard key={post.id} {...post} size={handleSizeForCard(index)}/>)
                                .filter((post, index) => index >= 1 && index <= 4 )
                            }
                        </div>
                    </div>
                    <div className={styles.rightBlock}>
                        {posts
                            .map((post, index) =>
                                <PostCard key={post.id} {...post} size={handleSizeForCard(index)}/>)
                            .filter((post, index) => index >= 5 && index <= 10)}
                    </div>
                </div> :

                <div className={styles.wrapper}>
                    <div className={`${styles.leftBlock}`}>
                        <div className={styles.postsShorted}>
                            {posts.map((post, index) =>
                                <PostCard key={post.id} {...post} size={handleSizeForCardNext(index)}/>)
                                .filter((post, index) => index <= 5)}
                        </div>
                    </div>
                    <div className={styles.rightBlock}>
                        {posts.map((post, index) =>
                            <PostCard key={post.id} {...post} size={handleSizeForCardNext(index)}/>)
                            .filter((post, index) => index >= 6 && index <= 11)}
                    </div>
                </div>
            }
        </>
    );
};

export default PostsList;