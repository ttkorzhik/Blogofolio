import React, {FC, MouseEventHandler} from 'react';
import PostCardBig from "./PostCardBig/PostCardBig";
import PostCardSmall from "./PostCardSmall/PostCardSmall";
import PostCardMedium from "./PostCardMedium/PostCardMedium";
import {selectCardAction} from "../../../../store/reducers/selectedCardReducer";
import {useDispatch} from "react-redux";

type PostCardSize = "big" | "medium" | "small"

export interface IPostCard {
    id: number
    text: string
    date: string
    lesson_num: number
    title: string
    author: number
    onClick?: MouseEventHandler
    image?: string
    like?: boolean,
    dislike?: boolean,
    favorite?: boolean,
    likes?: number | string
    dislikes?: number | string
    description?: string
}

export interface PostCardProps {
    size: PostCardSize
}

const PostCard:FC<IPostCard & PostCardProps> = (props) => {
    const dispatch = useDispatch();

    const handleCardSelect = () => dispatch(selectCardAction(props))

    const renderPostCard = () => {
        switch (props.size) {
            case "big":
                return <PostCardBig {...props} onClick={handleCardSelect}/>
            case "medium":
                return <PostCardMedium {...props} onClick={handleCardSelect}/>
            case "small":
                return <PostCardSmall {...props} onClick={handleCardSelect} />
        }

    }
    return renderPostCard()
};

export default PostCard;