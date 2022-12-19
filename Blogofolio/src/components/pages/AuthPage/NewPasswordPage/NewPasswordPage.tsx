import React, {ChangeEvent, FC, useState} from 'react';

import Form from "../Form/Form";
import {BtnVariants, ButtonTypeProps} from "../../../common/Button/Button";
import PageWrapper from "../../../common/PageWrapper/PageWrapper";
import {PageProps} from "../../../AppRouter/routes";

import styles from "../AuthPage.module.css";

const NewPasswordPage:FC<PageProps> = ({title}) => {
    const [formState, setFormState] = useState({
        password: "",
        passwordConfirm: ""
    })

    const handleSetPassword = (e: ChangeEvent<HTMLInputElement>) => {
        if(e) {
            setFormState(prevState => ({...prevState, password: e.target.value}))
        }
    }
    const handleSetPasswordConfirm = (e: ChangeEvent<HTMLInputElement>) => {
        if(e) {
            setFormState(prevState => ({...prevState, passwordConfirm: e.target.value}))
        }
    }
    const handleSubmit = (e:any) => {
        e.preventDefault()
        setFormState({
            password: "",
            passwordConfirm: ""
        })
    }
    const NEW_PASSWORD_CONFIG = {
        inputs: [
           {
                title: "Password",
                id: "Password",
                disabled: false,
                placeholder: "Your password",
                type: "password",
                name: "Password",
                onChange: handleSetPassword,
                value: formState.password
            }, {
                title: "Confirm password",
                id: "Confirm",
                disabled: false,
                placeholder: "Confirm password",
                type: "password",
                name: "Confirm password",
                onChange: handleSetPasswordConfirm,
                value: formState.passwordConfirm
            }],
        button: {
            variant: BtnVariants.forForm,
            children: "Set password",
            type: ButtonTypeProps.submit,
            onClick: handleSubmit,
            disabled: false
        }
    }

    return (
        <PageWrapper title={title}>
            <div className={styles.wrapper}>
                <div className={`${styles.block} ${styles.formNewPassword}`}>
                    <Form formConfig={NEW_PASSWORD_CONFIG}/>
                </div>
            </div>
        </PageWrapper>
    );
};

export default NewPasswordPage;