import React, {ChangeEvent, FC, useState} from 'react';

import Form from "../Form/Form";
import PageWrapper from "../../../common/PageWrapper/PageWrapper";
import {PageProps, Routes} from "../../../AppRouter/routes";

import styles from "../AuthPage.module.css";

const ResetAfterPage:FC<PageProps> = ({title}) => {
    const [formState, setFormState] = useState({
        email: "",
    })

    const handleSetEmail = (e: ChangeEvent<HTMLInputElement>) => {
        if(e) {
            setFormState(prevState => ({...prevState, email: e.target.value}))
        }
    }

    const RESET_PAGE_CONFIG = {
        inputs: [
            {
                title: "Email",
                id: "Email",
                disabled: false,
                placeholder: "Your email",
                type: "email",
                name: "Email",
                onChange: handleSetEmail,
                value: formState.email
            }
        ],
        home: {
            url: Routes.blog,
            text: "Go to Home",
        },
        message: {
            additional: "You will receive an email example@gmail.com with a link to reset your  password!"
        }
    }

    return (
        <PageWrapper title={title}>
            <div className={styles.wrapper}>
                <div className={`${styles.block} ${styles.formResetAfterEmail}`}>
                    <Form formConfig={RESET_PAGE_CONFIG}/>
                </div>
            </div>
        </PageWrapper>
    );
};

export default ResetAfterPage;