import styles from './Navbar.module.scss';
import React from 'react';

import UseServicesContext from '@context/useServices';
import useWindowSize from '@hooks/useWindow';

import Small from './small';
import Large from './large';

const Navbar = () => {

    const {width} = useWindowSize();
    
    return (
        <UseServicesContext>
            <div className={styles.container}>
                { width >= 800  
                    ?
                        <Large />
                    :
                        <Small />
                }
            </div>
        </UseServicesContext>
    )
}

export default Navbar