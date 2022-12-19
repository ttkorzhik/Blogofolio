import {createStore, combineReducers, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import { userReducer } from "./reducers/userReducer";
import {SelectedCardReducer} from "./reducers/selectedCardReducer";
import {articleReducer} from "./reducers/articleReducer";
import {myPostsReducer} from "./reducers/myPostsReducer";
import {postsReducer} from "./reducers/postsReducer";
import {EditCardReducer} from "./reducers/editCardReducer";

const rootReducer = combineReducers({
    selectedCard: SelectedCardReducer,
    user: userReducer,
    article: articleReducer,
    myPosts: myPostsReducer,
    allPosts: postsReducer,
    cardForEdit: EditCardReducer
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));