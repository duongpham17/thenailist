import styles from './Policy.module.scss';
import React from 'react';
import {PropsTypes} from 'pages/policy';

const Policy = (props: PropsTypes) => {

    const {policy} = props;

    return (
        <div className={styles.container}>
            <h1>PRIVACY POLICY</h1>

            <div className={styles.map}>
                {policy.map(el => 
                    <div className={styles.element} key={el._id}>
                        <h2>{el.name}</h2>
                        <div className={styles.text}>
                            {el.policy.map((x, index) => 
                                <div key={x._id}>
                                    <p>{x.description}</p>
                                </div>  
                            )}
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}

export default Policy