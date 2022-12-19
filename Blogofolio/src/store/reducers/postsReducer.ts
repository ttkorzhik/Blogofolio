import {Reducer} from "redux";
import {IPostCard} from "../../components/common/PostsList/PostCard/PostCard";

enum postActions {
    SET_ALL_POSTS = "SET_ALL_POSTS",
    DELETE_CARD = "DELETE_CARD"
}

interface IInitialState {
    allPosts: IPostCard[]
}

const initialState: IInitialState = {
    allPosts: []
}

export const postsReducer: Reducer = (state = initialState, action) => {
    switch (action.type) {
        case postActions.SET_ALL_POSTS:
            return {...state, allPosts: action.payload}

        case postActions.DELETE_CARD:
            const arrNew = state.allPosts.map((item: IPostCard) => item)
            const del = state.allPosts.find((card: IPostCard) => card.id === action.payload.id)
            const delIndex = arrNew.indexOf(del)
            arrNew.splice(delIndex, 1);
            return {...state, allPosts: arrNew}

        default:
            return state
    }
}

export const setAllPostsAction = (payload: any) => ({type: postActions.SET_ALL_POSTS, payload});
export const deleteCardAction = (payload: IPostCard) => ({type: postActions.DELETE_CARD, payload});