import styles from './Navbar.module.scss';
import React from 'react';
import useWindowSize from '@hooks/useWindow';

import Small from './small';
import Large from './large';

const Navbar = () => {

    const {width} = useWindowSize();
    
    return (

        <div className={styles.container}>
            { width >= 850  
                ?
                    <Large />
                :
                    <Small />
            }
        </div>

    )
}

export default Navbar