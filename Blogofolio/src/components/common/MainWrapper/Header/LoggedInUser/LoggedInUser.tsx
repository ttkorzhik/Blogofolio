import React, {FC} from 'react';
import vector from "../../../../../assets/Vector.svg"

import {useSelector} from "react-redux";

import styles from "./LoggedInUser.module.css"

interface LoggedInUserProps {
    forMenu?: boolean
}

const LoggedInUser:FC<LoggedInUserProps> = ({
    forMenu = false
}) => {
    const { user } = useSelector((state: any) => state.user)

    return (
        <div className={styles.LoggedInUser}>
            <div className={styles.initialsBlock}><p className={styles.initials}>{`${user.username[0]}`}</p></div>
            <p className={forMenu ? styles.fullNameWrap : styles.fullName}>{`${user.username}`}</p>
            {user.length > 1 && <button className={styles.vector}><img alt="menu" src={vector}/></button>}
        </div>
    );
};

export default LoggedInUser;
