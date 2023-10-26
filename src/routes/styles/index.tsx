import styles from './Styles.module.scss';
import React from 'react';
import {PropsTypes} from 'pages/styles';

import Introduction from './introduction';
import Gallery from './gallery';
import Reviews from './reviews';

const StylesIndex = (props: PropsTypes) => {

    return (
        <div className={styles.container}>
            <Introduction />
            <Gallery {...props} />
            <Reviews {...props} />
        </div>
    )
}

export default StylesIndex