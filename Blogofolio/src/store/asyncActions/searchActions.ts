import {setCardsAction} from "../reducers/selectedCardReducer";

export const handleSearchAllResults = (search: string): any => {
    return (dispatch: any) => {
        fetch(`https://studapi.teachmeskills.by/blog/posts/?search=${search}&limit=${199}`, {
            method: "GET",
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw new Error(res.statusText)
                }
            })
            .then(response => dispatch(setCardsAction(response.results)))
            .catch(e => console.log(e))
    }
}