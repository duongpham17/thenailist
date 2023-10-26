import styles from './Terms.module.scss';
import React from 'react';
import {PropsTypes} from 'pages/terms';

const Styles = (props: PropsTypes) => {

    const {terms} = props;

    return (
        <div className={styles.container}>
            <h1>TERMS & CONDITIONS</h1>

            <div className={styles.map}>
                {terms.map(el => 
                    <div className={styles.element} key={el._id}>
                        <h2>{el.name}</h2>
                        <div className={styles.text}>
                            {el.terms.map((x, index) => 
                                <div key={x._id}>
                                    <b>{index+1}.</b>
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

export default Styles