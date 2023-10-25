import styles from './Items.module.scss';
import React, {useContext} from 'react';
import {Context} from '../../Context';

import {AiOutlinePlus} from 'react-icons/ai';

const Items = () => {

    const {data, setSelectedData, selectedData, setActions} = useContext(Context);

    const onSelectedData = (data: typeof selectedData) => {
        setActions("");
        setSelectedData(data)
    };

    const onCreateItem = async () => {
        try{
            const data = {
                images: [],
                name: "unknown",
                description: "",
            };
        } catch(err){
            
        }
        
    };

    return (
        <div className={styles.container}>
            {data.map((el, index) => selectedData?._id === el._id 
            ?
                <div key={el._id} className={styles.selected} onClick={() => onSelectedData(el)}>
                    <div className={styles.boxed}>
                        <p>{index+1}. {el.name}</p>
                        <small>{el._id.slice(-6).toUpperCase()}</small>
                    </div>
                    <div className={styles.button} onClick={(e) => e.stopPropagation()}>
                        <button><AiOutlinePlus/></button>
                    </div>
                </div>
            :
                <div className={styles.element} key={el._id} onClick={() => onSelectedData(el)}>
                    <p>{index+1}. {el.name}</p>
                    <small>{el._id.slice(-6).toUpperCase()}</small>
                </div>
            )}
        </div>
    )
}

export default Items