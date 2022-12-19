import React, {FC} from 'react';
import Input from "../../../common/Input/Input";
import Button from "../../../common/Button/Button";
import {FormConfigProps} from "../interfaces/interfaces";
import {Link} from "react-router-dom";

import {useTheme} from "../../../../context/ThemeContext";

import styles from "./Form.module.css"

interface FormProps {
    formConfig: FormConfigProps
}

const Form:FC<FormProps> = ({formConfig}) => {
    const {isDarkTheme} = useTheme()

    return (
        <form className={`${styles.form}`}>
            {!!formConfig.message &&
                <div>
                    {!!formConfig.message.firstLine &&
                        <p className={`${isDarkTheme ? styles.confirmationDark : ""}
                         ${styles.confirmation}`} dangerouslySetInnerHTML={{__html:formConfig.message.firstLine}}></p>}
                    <p className={`${isDarkTheme ? styles.confirmationDark : ""} ${styles.confirmation}`}>
                       {formConfig.message.secondLine}
                    </p>
                </div> }

            {!!formConfig.message?.additional &&
                <p className={`${isDarkTheme && styles.confirmationSpecialDark} ${styles.confirmationSpecial}`}>
                    {formConfig.message.additional}
                </p>}

            {!!formConfig.inputs &&
                <div className={styles.inputs}>
                {formConfig.inputs.map(item => <Input {...item} key={item.id}/>)}
                </div>}

            {!!formConfig.link &&
                <Link to={formConfig.link.url} className={`${isDarkTheme ? styles.forgotDark : ""} ${styles.forgot}`}>
                    {formConfig.link.text}
                </Link>}

            {!!formConfig.button &&
                <Button variant={formConfig.button.variant}
                        type={formConfig.button.type}
                        disabled={formConfig.button.disabled}
                        onClick={formConfig.button?.onClick}
                        children={formConfig.button.children}/>}
            {!!formConfig.home &&
                <Link to={formConfig.home.url} className={styles.signInBtn}>{formConfig.home?.text}</Link>}

            {!!formConfig.noAccount &&
                <div className={styles.noAccount}>
                    <p className={`${isDarkTheme ? styles.dark : ""} ${styles.textWithLink}`}>
                        {formConfig.noAccount.text}
                    </p>
                    <Link to={formConfig.noAccount.url}
                          className={`${isDarkTheme ? styles.linkForSignDark : ""} ${styles.linkForSign}`}>{
                          formConfig.noAccount.linkText}
                    </Link>
                </div>}
        </form>
    )
};

export default Form;