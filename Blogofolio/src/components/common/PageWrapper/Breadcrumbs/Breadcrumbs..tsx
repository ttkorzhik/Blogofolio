import React, {FC, useMemo} from 'react';
import {useTheme} from "../../../../context/ThemeContext";

import {Link, matchPath, PathMatch, useLocation, useParams} from "react-router-dom";
import {IRoute, PUBLIC_ROUTES, Routes} from '../../../AppRouter/routes';

import styles from "./Breadcrumbs.module.css";

export enum LinksVariants {
    home = "Home",
    backToHome = "Back to home",
    post = "Post",
    AddPost = "Add Post"
}
const Breadcrumbs:FC = () => {
    const {pathname} = useLocation();
    const {isDarkTheme} = useTheme()
    const params = useParams();

    function matchRouteDefinitions(definitions: IRoute[]): PathMatch[] {
        const crumbs: PathMatch[] = [];

        definitions.forEach((definition) => {
            const match = matchPath(
                { path: definition.path, end: false },
                pathname
            );
            if (match) {
                crumbs.push(match);
            }
        });

        return crumbs;
    }

    const matches = useMemo(() => matchRouteDefinitions(PUBLIC_ROUTES), [pathname]);

    const isAuthPage = useMemo(() => {
        switch (pathname) {
            case Routes["signUpSuccess"]:
            case Routes["signUp"]:
            case Routes["signIn"]:
            case Routes["signUpConfirmation"]:
            case Routes["resetPassword"]:
            case Routes["resetAfter"]:
            case Routes["newPassword"]:
                return true

            default:
                return false
        }
    }, [pathname]);

    const isPostPage = useMemo(() => matches[1]?.pattern.path === Routes.article, [pathname]);

    return (
        <div className={styles.top}>
            {isAuthPage ? <Link to={Routes.blog} className={`${isDarkTheme ? styles.dark : ""} ${styles.link}`}>{LinksVariants.backToHome}</Link> :
                <>
                    <Link className={`${isDarkTheme ? styles.dark : ""} ${styles.link}`} to={Routes.blog}>{LinksVariants.home}</Link>
                    <p className={styles.text}>{isPostPage ? `${LinksVariants.post} ${params.id}` : LinksVariants.AddPost}</p>
                </>
                }
        </div>
    );
};

export default Breadcrumbs;