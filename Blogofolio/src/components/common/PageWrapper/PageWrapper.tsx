import React, {FC, ReactNode, useMemo} from 'react';
import Breadcrumbs from "./Breadcrumbs/Breadcrumbs.";
import Title from "./Title/Title";

import {useLocation} from 'react-router-dom';
import { Routes} from "../../AppRouter/routes";

import styles from "./PageWrapper.module.css"

interface PageWrapperProps {
    title?: string
    children: ReactNode
}

const PageWrapper:FC<PageWrapperProps> = ({title = "", children}) => {
    const { pathname } = useLocation()

    const showElements = useMemo(() => {
        switch (pathname) {
            case Routes["blog"]:
            case Routes["search"]:
                return true

            default:
                return false
        }
    }, [pathname])

    return (
        <div className={styles.wrapper}>
                {!showElements && <Breadcrumbs />}
                {!!title && <Title text={title} />}
                {children}
        </div>
    );
};

export default PageWrapper;