import styles from './Items.module.scss';
import React, {useContext} from 'react';
import Link from 'next/link';
import api from '@database/api';
import {Context} from '../../Context';
import {AiOutlinePlus} from 'react-icons/ai';

const Items = () => {

    const {data, setSelectedData, selectedData, setActions, onUpdateData} = useContext(Context);

    const onSelectedData = (data: typeof selectedData) => {
        setActions("");
        setSelectedData(data);
    };

    const onCreateItem = async () => {
        try{
            if(!selectedData) return null;
            const data = {
                name: "unknown",
                small: "",
                discount: 0,
                hfirst: 0,
                hsecond: 0,
            };
            const newData = {...selectedData};
            newData.prices.push(data);
            const response = await api.patch('/prices', newData);
            setSelectedData(response.data.data);
            onUpdateData(response.data.data);
        } catch(err){
            console.log(err);
        }
    };

    return (
        <div className={styles.container}>
            {data.map((el) => selectedData?._id === el._id 
            ?
                <div key={el._id} className={styles.selected} onClick={() => onSelectedData(el)}>
                    <div className={styles.boxed}>
                        <p>{el.name}</p>
                    </div>
                    {!!el.prices.length &&
                        <div className={styles.items}>
                            {el.prices.map((it, i) => 
                                <Link href={`/admin/prices#${it._id}`} key={it._id}>
                                    <span> {i+1}. {it.name.substring(0, 8)}... </span>
                                </Link>
                            )}
                        </div>
                    }
                    <div className={styles.button} onClick={(e) => e.stopPropagation()}>
                        <button onClick={onCreateItem}><AiOutlinePlus/></button>
                    </div>
                </div>
            :
                <div className={styles.element} key={el._id} onClick={() => onSelectedData(el)}>
                    <div className={styles.boxed}>
                        <p>{el.name}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Items