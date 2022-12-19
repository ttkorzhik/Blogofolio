import React, {FC} from 'react';

import Form from "../Form/Form";
import {PageProps, Routes} from "../../../AppRouter/routes";
import PageWrapper from "../../../common/PageWrapper/PageWrapper";

import styles from "../AuthPage.module.css";

const Success:FC<PageProps> = ({title}) => {

    const SUCCESS_CONFIG = {
        home: {
            url: Routes.blog,
            text: "Go to Home",
        },
        message: {
            firstLine: "Email confirmed.",
            secondLine: "Your registration is now completed"
        }
    }

    return (
        <PageWrapper title={title}>
            <div className={styles.wrapper}>
                <div className={`${styles.block} ${styles.formSuccess}`}>
                    <Form formConfig={SUCCESS_CONFIG}/>
                </div>
            </div>
        </PageWrapper>
    );
};

export default Success;