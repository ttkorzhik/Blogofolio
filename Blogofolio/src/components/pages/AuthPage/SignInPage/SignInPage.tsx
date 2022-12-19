import React, {ChangeEvent, FC, useState} from 'react';

import Form from "../Form/Form";
import {BtnVariants, ButtonTypeProps} from "../../../common/Button/Button";
import {PageProps, Routes} from "../../../AppRouter/routes";
import PageWrapper from "../../../common/PageWrapper/PageWrapper";

import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";


import styles from "../AuthPage.module.css";
import {handleUserSignIn} from "../../../../store/asyncActions/userActions";
import {InputError} from "../../../common/Input/Input";
import {initialErrorValue} from "../../AddPostPage/AddPostPage";

export interface ISignInFormErrors {
    email: InputError
    password: InputError
}

const initialSignInFormElementsError: ISignInFormErrors = {
    email: initialErrorValue,
    password: initialErrorValue,
}

const SignInPage:FC<PageProps> = ({title}) => {
    const [formState, setFormState] = useState({
        email: "",
        password: "",
    })
    const [formFieldsError, setFormFieldsError] = useState<ISignInFormErrors>(initialSignInFormElementsError)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSetEmail = (e: ChangeEvent<HTMLInputElement>) => {
        if(e) {
            setFormState(prevState => ({...prevState, email: e.target.value}))
            setFormFieldsError(prevState => ({ ...prevState, email: initialErrorValue }))
        }
    }
    const handleSetPassword = (e: ChangeEvent<HTMLInputElement>) => {
        if(e) {
            setFormState(prevState => ({...prevState, password: e.target.value}))
            setFormFieldsError(prevState => ({ ...prevState, password: initialErrorValue }))
        }
    }

    // const handleUserTokenCreate = async () => {
    //     const result = await tokenService.getToken(formState.email, formState.password)
    //
    //     for (let item in result) {
    //         localStorage.setItem(item, result[item])
    //     }
    // }
    //
    // const handleUpdateAccessToken = async () => {
    //     const refresh = localStorage.getItem("refresh")
    //     if (!!refresh) {
    //         const { accessToken } = await tokenService.updateAccessToken(refresh)
    //         localStorage.setItem("access", accessToken)
    //         return accessToken
    //     }
    // }
    //
    // const handleVerifyToken = async () => {
    //     const token = localStorage.getItem("access");
    //     const result = {
    //         token: token,
    //         valid: false
    //     }
    //
    //     if (!!token) {
    //         await tokenService.verifyToken(token)
    //         result.valid =true
    //     }
    //     return result
    // }
    //
    // const handleUserInfoCall =  async (token: string) => {
    //     return await UserService.getUser(token)
    // }
    //
    // const handleUserInfo = async () => {
    //     const {valid , token} = await handleVerifyToken();
    //     let user;
    //
    //     if (valid && token) {
    //         user = await handleUserInfoCall(token);
    //     }
    //     else  {
    //         const token = await handleUpdateAccessToken();
    //         user = await handleUserInfoCall(token);
    //     }
    //     return user
    // }


    // const handleSubmit = async () => {
    //     try {
    //         await handleUserTokenCreate();
    //         const user = await handleUserInfo()
    //         // const myPosts =  await setMyPosts()
    //         if (user) {
    //             dispatch(setUserAction(user))
    //             // dispatch(setMyPostsAction(myPosts))
    //             navigate(Routes.blog)
    //         }
    //     }
    //     catch (e) {
    //         console.log(e)
    //     }
    // }
    const handleFormValidate = () => {
        let isValid = true
        for (let field in formState) {
            // @ts-ignore
            if (!formState[field]) {
                setFormFieldsError(prevState => ({ ...prevState, [field]: { error: true, text: "Required Field is Empty" } }))
                isValid = false
            }
        }
        return isValid
    }

    const handleUserNavigate = () => navigate(Routes.blog)
    const handleSignIn = async () => {
        const isValid = handleFormValidate();
        if (isValid) {
            try {
                dispatch(await handleUserSignIn(formState.email, formState.password, handleUserNavigate))
            } catch (e) {
            }
        }
    }

    const SIGN_IN_CONFIG = {
        inputs: [
            {
                title: "Email",
                id: "Email",
                disabled: false,
                placeholder: "Your email",
                type: "email",
                name: "Email",
                onChange: handleSetEmail,
                value: formState.email,
                error: formFieldsError.email
            }, {
                title: "Password",
                id: "Password",
                disabled: false,
                placeholder: "Your password",
                type: "password",
                name: "Password",
                onChange: handleSetPassword,
                value: formState.password,
                error: formFieldsError.password
            }
        ],
        link: {
            url: Routes.resetPassword,
            text: "Forgot password?"
        } ,
        button: {
            variant: BtnVariants.forForm,
            children: "Sign In",
            type: ButtonTypeProps.button,
            onClick: handleSignIn,
            disabled: false
        },
        noAccount: {
            text: "Don’t have an account",
            url: Routes.signUp,
            linkText: "Sign Up"
        }
    }

    return (
        <PageWrapper title={title}>
            <div className={styles.wrapper}>
                <div className={`${styles.block} ${styles.formSignIn}`}>
                    <Form formConfig={SIGN_IN_CONFIG}/>
                </div>
            </div>
        </PageWrapper>
    );
};

export default SignInPage;