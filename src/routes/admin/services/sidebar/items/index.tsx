import styles from './Items.module.scss';
import React, {useContext} from 'react';
import {Context} from '../../Context';

const Items = () => {

    const {data, setSelectedData, selectedData} = useContext(Context);

    return (
        <div className={styles.container}>
            {data.map((el, index) => 
                <div key={el._id} className={selectedData?._id === el._id ? styles.selected : ""} onClick={() => setSelectedData(el)}>
                    <p>{index+1}. {el.name}</p>
                    <small>{el._id.slice(-6).toUpperCase()}</small>
                </div>
            )}
        </div>
    )
}

export default Items