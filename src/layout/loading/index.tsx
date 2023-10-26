import styles from './Loading.module.scss';
import React from 'react';

const Loading = () => {

    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <span>THE NAILIST</span>
                <span>NAILS - BROWS - BEAUTY</span>
            </div>
        </div>
    )
}

export default Loading