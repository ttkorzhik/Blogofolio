import { setUserAction } from "../reducers/userReducer"
import userService from "../../services/userService";
import tokenService from "../../services/tokenService";

export const handleUserSignUp = (email: string, password: string, username: string, callback: () => void):any => {
    return (dispatch: any) => {
        fetch("https://studapi.teachmeskills.by/auth/users/", {
            method: "POST",
            body: JSON.stringify({email, password, username}),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    console.log(res)
                    throw new Error(res.statusText)
                }
            })
            .then(user => dispatch(setUserAction(user)))
            .then(() => callback())
            .catch(e => console.log(e))
    }
}
export const handleUserSignIn = (email: string, password: string, callback: () => void):any => {
    return (dispatch: any) => {
       tokenService.getToken(email, password)
            .then(tokens => {
                for (let token in tokens) {
                    localStorage.setItem(token, tokens[token])
                }
                return userService.getUser(tokens.access)
            })
            .then(user => dispatch(setUserAction(user)))
            .then(() => callback())
            .catch(console.error)
    }
}

export const handleGetUser = (accessToken: string, refreshToken: string): any => {
    return (dispatch: any) => {
        userService.getUser(accessToken)
            .then(user => {
                if (!!user) {
                    dispatch(setUserAction(user))
                }
                else {
                    tokenService.updateAccessToken(refreshToken)
                        .then(token => {
                            if (typeof token === "object") {
                                localStorage.setItem("access", token.access)
                                return userService.getUser(token.access)
                            }
                        }).then(user => {
                        if (typeof user === "object") {
                            dispatch(setUserAction(user))
                        }
                    })
                }
            })
            .catch(console.error)
    }
}