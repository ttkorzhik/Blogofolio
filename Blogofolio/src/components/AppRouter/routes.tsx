import React, {FC} from 'react';
import {RouteObject} from "react-router-dom";

import SignInPage from "../pages/AuthPage/SignInPage/SignInPage";
import SignUpPage from "../pages/AuthPage/SignUpPage/SignUpPage";
import BlogPage from "../pages/BlogPage/BlogPage";
import ArticlePage from "../pages/ArticlePage/ArticlePage";
import SignUpConfirm from "../pages/AuthPage/SignUpConfirm/SignUpConfirm";
import ResetPage from "../pages/AuthPage/ResetPage/ResetPage";
import ResetAfterPage from "../pages/AuthPage/ResetAfterPage/ResetAfterPage";
import NewPasswordPage from "../pages/AuthPage/NewPasswordPage/NewPasswordPage";
import Success from "../pages/AuthPage/Success/Success";
import SearchPage from "../pages/SearchPage/SearchPage";
import AddPostPage from "../pages/AddPostPage/AddPostPage";
import EditPostPage from "../pages/EditPostPage/EditPostPage";

export interface PageProps {
    title?: string
}

// @ts-ignore
export interface IRoute extends RouteObject{
    path: string,
    Element: FC<PageProps>,
    title?: string
}

export enum Routes {
    blog = "/blog",
    article = "/blog/:id",
    search = "/search",
    addPost = "/add-post",
    signIn = "/signin",
    signUp = "/signup",
    signUpSuccess = "/signup/success",
    resetPassword = "/reset-password",
    resetAfter = "/reset-password-email",
    signUpConfirmation = "/activate/:uid/:token",
    newPassword = "/reset-password/new-password",
    editPost = "/edit-post"
}

export const PUBLIC_ROUTES: IRoute[] = [
    {path: Routes.signIn, Element: SignInPage, title: "Sign In"},
    {path: Routes.signUp, Element: SignUpPage, title: "Sign Up"},
    {path: Routes.blog, Element: BlogPage, title: "Blog"},
    {path: Routes.article, Element: ArticlePage},
    {path: Routes.signUpConfirmation, Element: SignUpConfirm, title: "Registration confirmation"},
    {path: Routes.resetPassword, Element: ResetPage, title: "Reset password"},
    {path: Routes.resetAfter, Element: ResetAfterPage, title: "Reset password"},
    {path: Routes.newPassword, Element: NewPasswordPage, title: "New password"},
    {path: Routes.signUpSuccess, Element: Success, title: "Success"},
    {path: Routes.search, Element: SearchPage},
]

export const PRIVATE_ROUTES: IRoute[] = [
    ...PUBLIC_ROUTES,
    {path: Routes.addPost, Element: AddPostPage, title: "Add Post"},
    {path: Routes.editPost, Element: EditPostPage, title: "Edit Post"},
]