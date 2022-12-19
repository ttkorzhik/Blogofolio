import {Reducer} from "redux";
import {IPostCard} from "../../components/common/PostsList/PostCard/PostCard";

enum myPostActions {
    SET_MY_POSTS = "SET_MY_POSTS",
    SET_ALL_POSTS = "SET_ALL_POSTS",
    DELETE_CARD = "DELETE_CARD"
}

interface IInitialState {
    myPosts: IPostCard[]
    allPosts: IPostCard[]
}

const initialState: IInitialState = {
    myPosts: [],
    allPosts: []
}

export const myPostsReducer: Reducer = (state = initialState, action) => {
    switch (action.type) {
        case myPostActions.SET_MY_POSTS:
            return {...state, myPosts: action.payload}
        default:
            return state
    }
}

export const setMyPostsAction = (payload: any) => ({type: myPostActions.SET_MY_POSTS, payload});