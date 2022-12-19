import {Reducer} from "redux";
import {IPostCard} from "../../components/common/PostsList/PostCard/PostCard";


enum EditCardActions {
    EDIT_CARD = "EDIT_CARD"
}

export interface initialStateType {
    cardForEdit: IPostCard | null,
}

const initialState: initialStateType = {
    cardForEdit: null,
}

export const EditCardReducer:Reducer = ((state = initialState, action) => {
    switch (action.type) {
        case EditCardActions.EDIT_CARD: {
            return {...state, cardForEdit: action.payload}}

        default: return state
    }
})

export const editCardAction = (payload: IPostCard | null) => ({type: EditCardActions.EDIT_CARD, payload});
