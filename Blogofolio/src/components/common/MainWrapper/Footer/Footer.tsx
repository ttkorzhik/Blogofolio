import React, {FC} from 'react';

import styles from "./Footer.module.css"

const Footer:FC = () => {
    return (
        <footer className={styles.footer}>
                <p className={styles.text}>©2022 Blogfolio</p>
                <p className={styles.text}>All rights reserved</p>
        </footer>
    );
};

export default Footer;