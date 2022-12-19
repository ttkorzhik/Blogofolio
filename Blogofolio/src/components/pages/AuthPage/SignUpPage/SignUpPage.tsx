import React, {ChangeEventHandler, FC, useState} from 'react';

import Form from "../Form/Form";
import {BtnVariants, ButtonTypeProps} from "../../../common/Button/Button";
import {PageProps, Routes} from "../../../AppRouter/routes";
import PageWrapper from "../../../common/PageWrapper/PageWrapper";

import {handleUserSignUp} from "../../../../store/asyncActions/userActions";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

import styles from "../AuthPage.module.css";
import {InputError} from "../../../common/Input/Input";
import {ISignInFormErrors} from "../SignInPage/SignInPage";
import {initialErrorValue} from "../../AddPostPage/AddPostPage";

interface ISignUpFormErrors extends ISignInFormErrors{
    email: InputError
    password: InputError
    name: InputError,
    passwordConfirm: InputError
}
const initialSignUpFormElementsError: ISignUpFormErrors = {
    email: initialErrorValue,
    password: initialErrorValue,
    name: initialErrorValue,
    passwordConfirm: initialErrorValue
}

const SignUpPage:FC<PageProps> = ({title}) => {

    const [formState, setFormState] = useState({
        email: "",
        password: "",
        name: "",
        passwordConfirm: ""
    })
    const [formFieldsError, setFormFieldsError] = useState<ISignUpFormErrors>(initialSignUpFormElementsError)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleUserRedirect = () => navigate(`${Routes.signUpConfirmation}?email=${formState.email}`);

    const handleSetEmail: ChangeEventHandler<HTMLInputElement> = ({target: {value: email }}): void => {
        setFormState(prevState => ({...prevState, email}));
        setFormFieldsError(prevState => ({ ...prevState, email: initialErrorValue }))
    }

    const handleSetName: ChangeEventHandler<HTMLInputElement> = ({target: {value: name }}): void => {
        setFormState(prevState => ({...prevState, name}));
        setFormFieldsError(prevState => ({ ...prevState, name: initialErrorValue }))
    }

    const handleSetPassword: ChangeEventHandler<HTMLInputElement> = ({target: {value: password }}): void => {
        setFormState(prevState => ({...prevState, password}));
        setFormFieldsError(prevState => ({ ...prevState, password: initialErrorValue }))
    }

    const handleSetPasswordConfirm: ChangeEventHandler<HTMLInputElement> = ({target: {value: passwordConfirm }}): void => {
        setFormState(prevState => ({...prevState, passwordConfirm}));
        setFormFieldsError(prevState => ({ ...prevState, passwordConfirm: initialErrorValue }))
    }

    const handleFormValidate = () => {
        let isValid = true
        for (let field in formState) {
            // @ts-ignore
            if (!formState[field]) {
                setFormFieldsError(prevState => ({ ...prevState, [field]: { error: true, text: "Required Field is Empty" } }))
                isValid = false
            }
        }
        if (formState.password !== formState.passwordConfirm) {
            setFormFieldsError(prevState => ({ ...prevState, passwordConfirm: { error: true, text: "Passwords don't match" } }))
            isValid = false
        }
        return isValid
    }

    const handleSubmit = () => {
        const isValid = handleFormValidate();
        if (isValid) {
            dispatch(handleUserSignUp(formState.email, formState.password, formState.name, handleUserRedirect))
        }
    }

    const SIGN_UP_CONFIG = {
        inputs: [
            {
                title: "Name",
                id: "Name",
                disabled: false,
                placeholder: "Your name",
                type: "text",
                name: "Name",
                onChange: handleSetName,
                value: formState.name,
                error: formFieldsError.name
            },
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
            },
            {
                title: "Confirm Password",
                id: "confirmPassword",
                disabled: false,
                placeholder: "Confirm your Password",
                type: "password",
                name: "userConfirmPassword",
                onChange: handleSetPasswordConfirm,
                value: formState.passwordConfirm,
                error: formFieldsError.passwordConfirm
            }
        ],
        button: {
            variant: BtnVariants.forForm,
            children: "Sign Up",
            type: ButtonTypeProps.button,
            onClick: handleSubmit,
            disabled: false
        },
        noAccount: {
            text: "Already have an account?",
            url: Routes.signIn,
            linkText: "Sign In"
        }
    }

    return (
        <PageWrapper title={title}>
            <div className={styles.wrapper}>
                <div className={`${styles.block} ${styles.formSignUp}`}>
                    <Form formConfig={SIGN_UP_CONFIG}/>
                </div>
            </div>
        </PageWrapper>
    );
};

export default SignUpPage;