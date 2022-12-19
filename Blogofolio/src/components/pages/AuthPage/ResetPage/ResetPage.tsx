import React, {ChangeEvent, FC, useState} from 'react';

import Form from "../Form/Form";
import {BtnVariants, ButtonTypeProps} from "../../../common/Button/Button";
import PageWrapper from "../../../common/PageWrapper/PageWrapper";
import {PageProps} from "../../../AppRouter/routes";
import {useNavigate} from "react-router-dom";

import styles from "../AuthPage.module.css";

const ResetPage:FC<PageProps>= ({title}) => {

    const [formState, setFormState] = useState({
        email: "",
    })

    const handleSetEmail = (e: ChangeEvent<HTMLInputElement>) => {
        if(e) {
            setFormState(prevState => ({...prevState, email: e.target.value}))
        }
    }
    const navigate = useNavigate();

    const handleSubmit = (e:any) => {
        e.preventDefault()
        setFormState({
            email: "",
        })
        navigate(`/reset-password-email`)
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
                value: formState.email,
                // error: {
                // text: "error",
                // error: true}
            }
        ],
        button: {
            variant: BtnVariants.forForm,
            children: "Reset",
            type: ButtonTypeProps.reset,
            onClick: handleSubmit,
            disabled: false
        }
    }

    return (
        <PageWrapper title={title}>
            <div className={styles.wrapper}>
                <div className={`${styles.block} ${styles.formReset}`}>
                    <Form formConfig={RESET_PAGE_CONFIG}/>
                </div>
            </div>
        </PageWrapper>
    );
};

export default ResetPage;