import {setAllPostsAction} from "../reducers/postsReducer";

export const handlePosts = (search?: string): any => {
    return (dispatch: any) => {
        if (search) {
            fetch(`https://studapi.teachmeskills.by/blog/posts/?search=${search}&limit=${199}`, {
                method: "GET",
            }).then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw new Error(res.statusText)
                }
            })
                .then(response => dispatch(setAllPostsAction(response.results)))
                .catch(e => console.log(e))
        }
        else fetch(`https://studapi.teachmeskills.by/blog/posts/?limit=${199}`, {
            method: "GET",
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw new Error(res.statusText)
                }
            })
            .then(response => dispatch(setAllPostsAction(response.results)))
            .catch(e => console.log(e))
    }
}