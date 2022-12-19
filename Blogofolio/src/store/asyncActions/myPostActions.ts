import {setMyPostsAction} from "../reducers/myPostsReducer";

export const handleMyPost = (image: File | null, text: string, lesson_num: number, title: string, token: string ):any => {
    return (dispatch: any) => {
        fetch("https://studapi.teachmeskills.by/blog/posts/", {
            method: "POST",
            body: JSON.stringify({image, text, lesson_num, title}),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw new Error(res.statusText)
                }
            })
            .then(post => dispatch(setMyPostsAction(post)))
            .catch(console.error)
    }
}