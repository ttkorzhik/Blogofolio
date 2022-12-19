import React, {FC, useEffect} from 'react';

import Form from "../Form/Form";
import {PageProps, Routes} from "../../../AppRouter/routes";
import PageWrapper from "../../../common/PageWrapper/PageWrapper";
import {useLocation, useParams} from "react-router-dom";
import userService from "../../../../services/userService";

import styles from "../AuthPage.module.css";

const SignUpConfirm:FC<PageProps> = ({title}) => {
    const location = useLocation();
    const {uid, token}= useParams();

    const REG_CONFIRM_CONFIG = {
        home: {
            url: Routes.blog,
            text: "Go to Home",
        },
        message: {
            firstLine: `Please activate your account with the activation link in the email <b> ${location.search.split("email=")[1]} </b>`,
            secondLine: "Please, check your email"
        }
    }
    const handleUserActivation = async () => {
        if (uid && token) {
            await userService.activateUser({uid, token})
        }
    }

    useEffect(() => {
        if (uid && token) {
            handleUserActivation()
        }
    }, [])

    return (
        <PageWrapper title={title}>
            <div className={styles.wrapper}>
                <div className={`${styles.block} ${styles.formConfirmation}`}>
                    <Form formConfig={REG_CONFIRM_CONFIG}/>
                </div>
            </div>
        </PageWrapper>
    );
};

export default SignUpConfirm;