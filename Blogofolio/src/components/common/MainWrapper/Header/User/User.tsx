import React, {FC} from 'react';

import user from "../../../../../assets/user.svg"

import styles from "./User.module.css"
import {Link} from "react-router-dom";
import {Routes} from "../../../../AppRouter/routes";

const User:FC = () => {
    return (
        <Link to={Routes.signIn} className={styles.userBlock}>
            <div className={styles.userLink}>
                <img src={user} alt="user" className={styles.userImg}/>
            </div>
        </Link>
    );
};

export default User;