import {Reducer} from "redux";
import {IPostCard} from "../../components/common/PostsList/PostCard/PostCard";


enum SelectedCardActions {
    SELECT_CARD = "SELECT_CARD",
    SELECT_IMG = "SELECT_IMG",
    SET_CARDS = "SET_CARDS",
    UPDATE_CARD = "UPDATE_CARD",
    DELETE_CARD = "DELETE_CARD ",
}

export interface initialStateType {
    selectedCard: IPostCard | null,
    selectedImg: string,
    cards: IPostCard[]
}

const initialState: initialStateType = {
    selectedCard: null,
    selectedImg: "null",
    cards: []
}

export const SelectedCardReducer:Reducer = ((state = initialState, action) => {
    switch (action.type) {
        case SelectedCardActions.SELECT_CARD:
        {
            return {...state, selectedCard: action.payload}
        }
        case SelectedCardActions.SELECT_IMG: {
            return {...state, selectedImg: action.payload}
        }
        case SelectedCardActions.SET_CARDS:
            return {...state, cards: action.payload}

        case SelectedCardActions.UPDATE_CARD:
            const arr = state.cards.map((item: IPostCard) => item)
            const oldCard = arr.find((card: IPostCard) => card.id === action.payload.id)
            const cardIndex = arr.indexOf(oldCard)
            arr.splice(cardIndex, 1, action.payload);
            return {...state, cards: arr}

        case SelectedCardActions.DELETE_CARD:
            const arrNew = state.cards.map((item: IPostCard) => item)
            const del = state.cards.find((card: IPostCard) => card.id === action.payload.id)
            const delIndex = arrNew.indexOf(del)
            arrNew.splice(delIndex, 1);
            return {...state, cards: arrNew}

        default: return state
    }
})

export const selectCardAction = (payload: any) => ({type: SelectedCardActions.SELECT_CARD, payload});
export const selectImgAction = (payload: any) => ({type: SelectedCardActions.SELECT_IMG, payload});
export const setCardsAction = (payload: IPostCard[]) => ({type: SelectedCardActions.SET_CARDS, payload});
export const updateCardAction = (payload: IPostCard) => ({type: SelectedCardActions.UPDATE_CARD, payload});
export const deleteCardAction = (payload: IPostCard) => ({type: SelectedCardActions.DELETE_CARD, payload});